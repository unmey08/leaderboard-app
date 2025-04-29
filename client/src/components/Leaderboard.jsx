import { useState, useMemo } from "react";
import AddUserModal from "./addUserModal";
import Headers from "./Headers";
import Searchbar from "./Searchbar";
import UsersList from "./UsersList";
import Loader from "./Loader";
import { AnimatePresence, motion } from "motion/react";
import Alert from "./Alert";
import useFetchUserData from "../hooks/useFetchUserData";
import DOMPurify from "dompurify";
import Pagination from "./Pagination";

const API_BASE = import.meta.env.VITE_API_BASE;

const Leaderboard = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  // const [users, setUsers] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
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

  // sort users alphabetically
  const sortUsersAlphabetically = () => {
    let sortedData = [];
    setAlphabetSortOrder((prev) =>
      prev === "default" ? "asc" : prev === "asc" ? "desc" : "asc"
    );
    if (alphabetSortOrder === "asc" || alphabetSortOrder === "default") {
      sortedData = users.sort((a, b) => a.name.localeCompare(b.name));
    } else if (alphabetSortOrder === "desc") {
      sortedData = users.sort((a, b) => b.name.localeCompare(a.name));
    }
    setUsers(sortedData);
  };

  // sort by points
  const sortUsersPoints = () => {
    let sortedData = [];
    setPointsSortOrder((prev) =>
      prev === "default" ? "asc" : prev === "asc" ? "desc" : "asc"
    );
    if (pointsSortOrder === "asc") {
      sortedData = users.sort((a, b) => a.points - b.points);
    } else if (pointsSortOrder === "desc") {
      sortedData = users.sort((a, b) => b.points - a.points);
    }
    setUsers(sortedData);
  };

  //delete a user
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to delete user with ID ${id}: ${response.statusText}`
        );
      }

      // Update state after successful deletion
      const deletedUser = users.filter((user) => user._id === id)[0];
      const newUsers = users.filter((user) => user._id !== id);
      const sortedData = newUsers.sort((a, b) => b.points - a.points);
      let rank = 1;
      for (let i = 0; i < sortedData.length; i++) {
        // increase rank only if current score less than previous
        if (i > 0 && sortedData[i].points < sortedData[i - 1].points) {
          rank++;
        }
        sortedData[i].rank = rank;
      }
      setUsers(sortedData);
      setAlertMessage({
        name: deletedUser.name,
        type: "danger",
        visible: true,
      });
      setTimeout(() => {
        setAlertMessage({ type: "", name: "", visible: false });
      }, 5000);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // reset points of all users to zero
  const resetPoints = async () => {
    try {
      const response = await fetch(`${API_BASE}/users/reset`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Failed to reset points: ${response.statusText}`);
      }

      // Update all users' points to 0 after successful request
      const sortedData = users.sort((a, b) => b.points - a.points);
      let rank = 1;
      for (let i = 0; i < sortedData.length; i++) {
        // increase rank only if current score less than previous
        if (i > 0 && sortedData[i].points < sortedData[i - 1].points) {
          rank++;
        }
        sortedData[i].rank = rank;
        sortedData[i].points = 0;
      }
      setUsers(sortedData);
      // setUsers((users) => users.map((user) => ({ ...user, points: 0 })));
      setAlertMessage({
        name: "",
        type: "info",
        visible: true,
      });
      setTimeout(() => {
        setAlertMessage({ type: "", name: "", visible: false });
      }, 5000);
    } catch (error) {
      console.error("Error resetting points:", error);
    }
  };

  // search functionality
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    const sanitizedSearchText = DOMPurify.sanitize(searchValue);
    setSearchText(sanitizedSearchText);
  };

  const filteredData = useMemo(
    () =>
      searchText !== ""
        ? users.filter((user) =>
            user.name.toLowerCase().includes(searchText.toLowerCase())
          )
        : users,
    [users, searchText]
  );

  //update points
  const updateUserPoints = async (id, delta) => {
    const user = users.filter((user) => user._id === id)[0];
    if (user.points >= 0 && user.points <= 100) {
      try {
        const response = await fetch(`${API_BASE}/users/${id}/points`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ delta }),
        });

        if (!response.ok) {
          throw new Error(
            `Failed to update points for user ${id}: ${response.statusText}`
          );
        }

        const updatedUser = await response.json();

        // Update the users state with the updated user data
        const updatedUsersData = users.map((user) =>
          user._id === id ? updatedUser : user
        );

        // Sort the users and assign ranks
        const sortedData = updatedUsersData.sort((a, b) => b.points - a.points);

        let rank = 1;
        for (let i = 0; i < sortedData.length; i++) {
          // increase rank only if current score less than previous
          if (i > 0 && sortedData[i].points < sortedData[i - 1].points) {
            rank++;
          }
          sortedData[i].rank = rank;
        }
        setUsers(sortedData);
      } catch (error) {
        console.error("Error updating user points:", error);
      }
    }
  };

  //add a user
  const addUser = async (newUser) => {
    try {
      const response = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`Failed to add user: ${response.statusText}`);
      }

      const createdUser = await response.json();

      // Update the users state with the newly added user
      const updatedUsers = [...users, createdUser.data];

      const sortedData = updatedUsers.sort((a, b) => b.points - a.points);

      let rank = 1;
      for (let i = 0; i < sortedData.length; i++) {
        // increase rank only if current score less than previous
        if (i > 0 && sortedData[i].points < sortedData[i - 1].points) {
          rank++;
        }
        sortedData[i].rank = rank;
      }
      // setUsers(sortedData)
      if (sortedData.length > 1) {
        setUsers(sortedData);
      } else {
        sortedData[0].rank = 1;
        setUsers(sortedData);
      }
      setAlertMessage({
        name: newUser.name,
        type: "success",
        visible: true,
      });
      setTimeout(() => {
        setAlertMessage({ type: "", name: "", visible: false });
      }, 5000);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

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

  return (
    <div className="w-full md:w-3/4 mx-auto">
      <AnimatePresence>
        {showAddUserModal && (
          <AddUserModal
            showAddUserModal={showAddUserModal}
            setShowAddUserModal={setShowAddUserModal}
            addUser={addUser}
            key="add-user-modal"
          />
        )}
      </AnimatePresence>
      <div className="py-8">
        <div>
          <h1 className="text-4xl font-semibold leading-tight mb-8">
            Leaderboard 🏆
          </h1>
        </div>
        <div className="flex justify-between font-semibold flex-col md:flex-row">
          <Searchbar searchText={searchText} handleSearch={handleSearch} />
          <div className="mt-4 md:mt-0 w-full md:w-1/3 flex justify-between md:justify-around">
            <motion.button
              className="bg-neutral-800 hover:bg-neutral-700 text-gray-100 md:w-32 px-4 py-2 rounded-xl cursor-pointer"
              onClick={() => setShowAddUserModal(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Add user
            </motion.button>
            <motion.button
              className="bg-neutral-800 hover:bg-neutral-700 text-gray-100 md:w-32 px-4 py-2 rounded-xl cursor-pointer"
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
          sortUsersAlphabetically={sortUsersAlphabetically}
          sortUsersPoints={sortUsersPoints}
          alphabetSortOrder={alphabetSortOrder}
          pointsSortOrder={pointsSortOrder}
        />
        {isLoading && <Loader />}
        {!isLoading && (
          <div>
            <UsersList
              users={paginatedUsers}
              deleteUser={deleteUser}
              updateUserPoints={updateUserPoints}
              setUsers={setUsers}
            />
            {filteredData.length === 0 && (
              <p className="text-xl font-bold my-10">No users found</p>
            )}
          </div>
        )}
        {error && (
          <p className="text-xl font-bold my-10">
            Could not fetch data. Please try again
          </p>
        )}
        <Pagination
          handlePageChange={handlePageChange}
          pagination={pagination}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};
export default Leaderboard;
