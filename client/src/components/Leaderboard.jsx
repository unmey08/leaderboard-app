import { useState } from "react";
import AddUserModal from "./addUserModal";
import Filter from "./Filter";
import Headers from "./Headers";
import Searchbar from "./Searchbar";
import UsersList from "./UsersList";

const Leaderboard = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  return (
    <div className="w-full md:w-3/4 mx-auto">
      {showAddUserModal && (
        <AddUserModal
          showAddUserModal={showAddUserModal}
          setShowAddUserModal={setShowAddUserModal}
        />
      )}
      <div className="py-8">
        <div>
          <h1 className="text-4xl font-semibold leading-tight mb-8">
            Leaderboard 🏆
          </h1>
        </div>
        <div className="flex justify-between">
          <Searchbar />
          <button
            className="bg-neutral-800 hover:bg-neutral-700 text-gray-100 w-1/3 md:w-24 rounded-xl cursor-pointer"
            onClick={() => setShowAddUserModal(true)}
          >
            Add User
          </button>
        </div>
        <Filter />
        <Headers />
        <UsersList />
      </div>
    </div>
  );
};
export default Leaderboard;
