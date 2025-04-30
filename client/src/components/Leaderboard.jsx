import { useState, useMemo, useRef, useEffect } from "react";
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

const API_BASE = "https://leaderboard-app-inky.vercel.app";

const Leaderboard = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const { users, setUsers, isLoading, error } = useFetchUserData(API_BASE);
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
  const addUserModalRef = useRef();

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
      const response = await fetch(`${API_BASE}/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const deletedUser = users.filter((user) => user._id === id)[0];
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(assignRanks(updatedUsers));
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
      const response = await fetch(`${API_BASE}/users/reset`, {
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
      const response = await fetch(`${API_BASE}/users`, {
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
    try {
      const response = await fetch(`${API_BASE}/users/${id}/points`, {
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
  const paginatedUsers = filteredData.slice(
    (pagination.currentPage - 1) * pagination.itemsPerPage,
    pagination.currentPage * pagination.itemsPerPage
  );

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

  const handleClickOutside = (e) => {
    if (
      addUserModalRef.current &&
      !addUserModalRef.current.contains(e.target)
    ) {
      setShowAddUserModal(false);
    }
  };

  useEffect(() => {
    if (showAddUserModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAddUserModal]);

  return (
    <div className="w-full md:w-3/4 mx-auto">
      <AnimatePresence>
        {showAddUserModal && (
          <AddUserModal
            showAddUserModal={showAddUserModal}
            setShowAddUserModal={setShowAddUserModal}
            addUser={addUser}
            ref={addUserModalRef}
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
      <div className="py-8">
        <h1 className="text-4xl font-semibold mb-8">Leaderboard 🏆</h1>
        <div className="flex justify-between font-semibold flex-col md:flex-row">
          <Searchbar searchText={searchText} handleSearch={handleSearch} />
          <div className="mt-4 md:mt-0 flex gap-4 justify-between">
            <motion.button
              className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg hover:cursor-pointer"
              onClick={() => setShowAddUserModal(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Add user
            </motion.button>
            <motion.button
              className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg hover:cursor-pointer"
              onClick={resetPoints}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset points
            </motion.button>
          </div>
        </div>
        {alertMessage.visible && <Alert alertMessage={alertMessage} />}
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
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <UsersList
              users={paginatedUsers}
              deleteUser={deleteUser}
              updateUserPoints={updateUserPoints}
              setShowUserModal={setShowUserModal}
              setCurrentUser={setCurrentUser}
            />
            {filteredData.length === 0 && (
              <p className="text-xl font-bold my-10">No users found</p>
            )}
          </>
        )}
        {error && (
          <p className="text-xl font-bold my-10">Error fetching data.</p>
        )}
        <Pagination
          pagination={pagination}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Leaderboard;
