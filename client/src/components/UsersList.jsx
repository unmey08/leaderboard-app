import { data } from "../data/mockData";

const UsersList = () => {
  return (
    <div className=" flex flex-col">
      {data.map((item, index) => (
        <div className="border border-neutral-800 overflow-hidden my-4 rounded-2xl dark:bg-neutral-800 outline-none text-gray-100 px-8 antialiased font-medium">
          <div className="flex justify-around items-center">
            <p>{index + 1}</p>
            <button className="w-full text-left px-4 py-8 hover:underline hover:cursor-pointer">
              {item.name}
            </button>
            <p>{item.points}</p>
            <button className="bg-neutral-600 hover:bg-neutral-500 text-gray-100 w-12 rounded-xl cursor-pointer p-1">
              +
            </button>
            <button className="bg-neutral-600 hover:bg-neutral-500 text-gray-100 w-12 rounded-xl cursor-pointer p-1">
              -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default UsersList;
