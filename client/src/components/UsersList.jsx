import { data } from "../data/mockData";
import User from "./User";
import { Reorder } from "motion/react";

const UsersList = () => {
  return (
    <Reorder.Group className=" flex flex-col" values={data}>
      {data.map((item, index) => (
        <User item={item} index={index} key={item.id} />
      ))}
    </Reorder.Group>
  );
};
export default UsersList;
