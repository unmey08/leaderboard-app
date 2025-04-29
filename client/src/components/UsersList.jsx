import User from "./User";
import { AnimatePresence, Reorder } from "motion/react";

const UsersList = ({ users, setUsers, deleteUser, updateUserPoints }) => {
  return (
    <Reorder.Group
      className=" flex flex-col"
      values={users}
      onReorder={setUsers}
      axis="y"
    >
      <AnimatePresence>
        {users.map((item, index) => (
          <Reorder.Item value={item.points} key={item._id}>
            <User
              item={item}
              deleteUser={deleteUser}
              updateUserPoints={updateUserPoints}
              index={index}
              key={item}
            />
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};
export default UsersList;
