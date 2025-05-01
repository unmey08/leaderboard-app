import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import DOMPurify from "dompurify";

import AddUserModal from "./AddUserModal";
import UserModal from "./UserModal";
import Headers from "./Headers";
import Searchbar from "./Searchbar";
import UsersList from "./UsersList";
import Loader from "./Loader";
import Alert from "./Alert";
import Pagination from "./Pagination";
import useFetchUserData from "../hooks/useFetchUserData";
import { sortData, assignRanks } from "../utils/dataUtils";
import Winner from "./Winner";

const Leaderboard = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const { users, setUsers, isLoading, error } = useFetchUserData();
  const [alphabetSortOrder, setAlphabetSortOrder] = useState("default");
  const [pointsSortOrder, setPointsSortOrder] = useState("desc");
  const [alertMessage, setAlertMessage] = useState({
    type: "",
    name: "",
    visible: false,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 5,
  });
  const [showConfetti, setShowConfetti] = useState(false);

  // Sorting handlers
  const toggleSortOrder = (currentOrder) =>
    currentOrder === "asc" ? "desc" : "asc";

  // sort users alphabetically and by points
  const sortUsers = (key, sortOrder, setSortOrder) => {
    const newOrder = toggleSortOrder(sortOrder);
    const sortedData =
      key === "name"
        ? [...users].sort((a, b) =>
            newOrder === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name)
          )
        : sortData(users, key, newOrder);

    setSortOrder(newOrder);
    setUsers(assignRanks(sortedData));
  };

  // delete a user and rank existing users again
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const deletedUser = users.filter((user) => user._id === id)[0];
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(assignRanks(updatedUsers));

      // get current page to handle edge case where the last item on a particular page is deleted
      const totalPages = Math.ceil(
        updatedUsers.length / pagination.itemsPerPage
      );
      const newCurrentPage = Math.min(pagination.currentPage, totalPages);

      setPagination((prev) => ({ ...prev, currentPage: newCurrentPage }));

      setAlertMessage({
        type: "danger",
        name: deletedUser.name,
        visible: true,
      });
      setTimeout(
        () => setAlertMessage({ type: "", name: "", visible: false }),
        5000
      );
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // reset all users to 0 points
  const resetPoints = async () => {
    try {
      const response = await fetch(`/users/reset`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const updatedUsers = users.map((user) => ({ ...user, points: 0 }));
      setUsers(assignRanks(updatedUsers));
      setAlertMessage({ type: "info", visible: true });
      setTimeout(
        () => setAlertMessage({ type: "", name: "", visible: false }),
        5000
      );
    } catch (err) {
      console.error("Error resetting points:", err);
    }
  };

  // add a new user
  const addUser = async (newUser) => {
    try {
      const response = await fetch(`/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const createdUser = await response.json();
      const updatedUsers = assignRanks([...users, createdUser.data]);
      setUsers([...updatedUsers]);
      setAlertMessage({ type: "success", name: newUser.name, visible: true });
      setTimeout(
        () => setAlertMessage({ type: "", name: "", visible: false }),
        5000
      );
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  // update points for a user
  const updateUserPoints = async (id, delta) => {
    setShowConfetti(false);
    try {
      const response = await fetch(`/users/${id}/points`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delta }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const updatedUser = await response.json();
      const updatedUsers = users.map((user) =>
        user._id === id ? updatedUser : user
      );
      setUsers(assignRanks(sortData(updatedUsers, "points", "desc")));

      // confetti if a user reaches 100 points
      if (updatedUser.points === 100) {
        setShowConfetti(true);
      }
    } catch (err) {
      console.error("Error updating user points:", err);
    }
  };

  const handleSearch = (e) => {
    setSearchText(DOMPurify.sanitize(e.target.value));
  };

  // filter data based on search
  const filteredData = useMemo(
    () =>
      searchText
        ? users.filter((user) =>
            user.name.toLowerCase().includes(searchText.toLowerCase())
          )
        : users,
    [users, searchText]
  );

  // show 5 users per page
  const paginatedUsers =
    searchText === ""
      ? filteredData.slice(
          (pagination.currentPage - 1) * pagination.itemsPerPage,
          pagination.currentPage * pagination.itemsPerPage
        )
      : filteredData;

  const totalPages = Math.ceil(filteredData.length / pagination.itemsPerPage);

  const handlePageChange = (direction) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: Math.max(
        1,
        Math.min(totalPages, prev.currentPage + direction)
      ),
    }));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full md:w-3/4 mx-auto pb-48 md:pb-96">
      {/* Modals */}
      <AnimatePresence>
        {showAddUserModal && (
          <AddUserModal
            showAddUserModal={showAddUserModal}
            setShowAddUserModal={setShowAddUserModal}
            addUser={addUser}
          />
        )}
        {showUserModal && (
          <UserModal
            showUserModal={showUserModal}
            setShowUserModal={setShowUserModal}
            user={currentUser}
            key="user-modal"
          />
        )}
      </AnimatePresence>
      <div className="py-2 md:py-8">
        <h1 className="pt-10 text-4xl font-semibold mb-8 text-slate-50">
          Leaderboard 🏆
        </h1>
        {/* Search, add user and reset points */}
        <div className="flex justify-between font-semibold flex-col md:flex-row ">
          <Searchbar searchText={searchText} handleSearch={handleSearch} />
          <div className="mt-4 md:mt-0 flex gap-4 justify-between">
            <motion.button
              className="bg-slate-600/40 hover:bg-slate-600/60 text-white px-4 py-2 rounded-lg hover:cursor-pointer shadow-lg shadow-violet-700"
              onClick={() => setShowAddUserModal(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open add user modal"
            >
              Add user
            </motion.button>
            <motion.button
              className="bg-slate-600/40 hover:bg-slate-600/60 text-white px-4 py-2 rounded-lg hover:cursor-pointer shadow-lg shadow-violet-700"
              onClick={resetPoints}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Reset all points"
            >
              Reset points
            </motion.button>
          </div>
        </div>
        {alertMessage.visible && <Alert alertMessage={alertMessage} />}
        {/* Top 3 rankings */}
        {users.length > 0 && users.some((user) => user.points > 0) ? (
          <Winner
            winner={users[0]}
            runnerup={users.length > 1 ? users[1] : null}
            secondRunnerup={users.length > 2 ? users[2] : null}
            showConfetti={showConfetti}
          />
        ) : (
          ""
        )}
        {/* Ranking board */}
        <div className="bg-white/90 rounded-2xl p-4 mt-4 md:mt-10">
          <h3 className="text-slate-700 font-bold text-xl">Rankings</h3>
          <Headers
            sortUsersAlphabetically={() =>
              sortUsers("name", alphabetSortOrder, setAlphabetSortOrder)
            }
            sortUsersPoints={() =>
              sortUsers("points", pointsSortOrder, setPointsSortOrder)
            }
            alphabetSortOrder={alphabetSortOrder}
            pointsSortOrder={pointsSortOrder}
          />
          <UsersList
            users={paginatedUsers}
            deleteUser={deleteUser}
            updateUserPoints={updateUserPoints}
            setShowUserModal={setShowUserModal}
            setCurrentUser={setCurrentUser}
          />
          {filteredData.length === 0 && (
            <p className="text-xl font-bold my-10 text-slate-700">
              No users found
            </p>
          )}
          {error && (
            <p className="text-xl font-bold my-10 text-slate-700">
              Error fetching data.
            </p>
          )}
        </div>
        <Pagination
          pagination={pagination}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          searchText={searchText}
        />
      </div>
    </div>
  );
};

export default Leaderboard;
