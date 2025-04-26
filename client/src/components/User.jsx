import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import UserModal from "./UserModal";

const User = ({ item, index }) => {
  const [showUserModal, setShowUserModal] = useState(false);

  const deleteUser = (id) => {
    console.log(id);
  };

  const updateUserPoints = (type) => {
    console.log(type);
  };

  return (
    <div className="border border-neutral-800 overflow-hidden my-4 rounded-2xl dark:bg-neutral-800 outline-none text-gray-100 px-8 antialiased font-medium text-left">
      <div className="flex justify-around items-center">
        <p className="w-1/10">{index + 1}</p>
        <div className="w-1/2 flex items-center">
          <p className="rounded-full bg-pink-200 w-10 h-10 shrink-0 grow-0 flex items-center justify-center text-black">
            {item.name.slice(0, 1).toUpperCase()}
          </p>
          <button
            className="px-4 py-8 hover:underline hover:cursor-pointer"
            onClick={() => setShowUserModal(true)}
          >
            {item.name}
          </button>
        </div>
        <div className="w-1/5">
          <p className="rounded-full bg-amber-200 w-10 h-10 shrink-0 grow-0 flex items-center justify-center text-black font-bold">
            {item.points}
          </p>
        </div>
        <div className="w-1/10">
          <div className="block md:hidden">
            <button
              id="dropdownMenuIconButton"
              data-dropdown-toggle="dropdownDots"
              className="inline-flex items-center p-2 text-sm font-medium text-center hover:cursor-pointer"
              type="button"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 4 15"
              >
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            </button>
            <div
              id="dropdownDots"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownMenuIconButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Add 10 points
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Subtract 10 points
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="hidden md:flex">
            <button
              className="bg-neutral-600 hover:bg-neutral-400 text-white border border-neutral-500 w-12 rounded-s-md cursor-pointer p-1"
              onClick={() => updateUserPoints("increment", item.id)}
            >
              +
            </button>
            <button
              className="bg-neutral-600 hover:bg-neutral-400 text-white w-12 border-t border-b border-neutral-500 cursor-pointer p-1"
              onClick={() => updateUserPoints("decrement", item.id)}
            >
              -
            </button>
            <button
              className="bg-neutral-600 hover:bg-neutral-400 text-white w-12 border rounded-e-md border-neutral-500 cursor-pointer p-1"
              onClick={() => deleteUser(item.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
      {showUserModal && (
        <UserModal
          showUserModal={showUserModal}
          setShowUserModal={setShowUserModal}
          user={item}
        />
      )}
    </div>
  );
};
export default User;
