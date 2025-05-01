import User from "./User";
import { AnimatePresence, Reorder } from "motion/react";

const UsersList = ({
  users,
  setUsers,
  deleteUser,
  updateUserPoints,
  setShowUserModal,
  setCurrentUser,
}) => {
  return (
    <Reorder.Group
      className=" flex flex-col"
      values={users}
      onReorder={setUsers}
      axis="y"
    >
      {/* Reorder with motion, based on the user data */}
      <AnimatePresence>
        {users.map((item, index) => (
          <Reorder.Item value={item.points} key={item._id}>
            <User
              item={item}
              deleteUser={deleteUser}
              updateUserPoints={updateUserPoints}
              index={index}
              key={item}
              setShowUserModal={setShowUserModal}
              setCurrentUser={setCurrentUser}
            />
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};
export default UsersList;
