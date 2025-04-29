import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import UserModal from "./UserModal";
import { animate, AnimatePresence, motion } from "motion/react";
import goldMedal from "../assets/gold-medal.png";
import silverMedal from "../assets/silver-medal.png";
import bronzeMedal from "../assets/bronze-medal.png";

const User = ({ item, index, deleteUser, updateUserPoints }) => {
  const [showUserModal, setShowUserModal] = useState(false);

  const handleDelete = (id) => {
    deleteUser(id);
  };

  return (
    <motion.div
      variants={{
        initial: {
          opacity: 0,
          x: -300,
          y: 0,
        },
        animate: (index) => ({
          opacity: 1,
          x: 0,
          transition: {
            delay: 0.2 * index,
            ease: ["easeInOut"],
          },
        }),
        exit: {
          opacity: 0,
          x: 0,
          y: 25,
          transition: {
            ease: ["easeInOut"],
          },
        },
      }}
      whileInView="animate"
      initial="initial"
      key={item._id}
      custom={index}
    >
      <AnimatePresence>
        <motion.div
          className="border border-neutral-800 overflow-hidden my-2 rounded-2xl dark:bg-neutral-800 outline-none text-gray-100 antialiased font-medium text-left"
          key={item._id}
        >
          <div className="flex justify-around items-center">
            {item.rank === 1 && <img src={goldMedal} className="h-8 w-8" />}
            {item.rank === 2 && <img src={silverMedal} className="h-8 w-8" />}
            {item.rank === 3 && <img src={bronzeMedal} className="h-8 w-8" />}
            {item.rank > 3 && (
              <p className="w-8 flex text-xl font-extrabold justify-center">
                {item.rank}
              </p>
            )}
            <div className="w-1/2 flex items-center">
              <p className="rounded-full bg-pink-200 w-10 h-10 shrink-0 grow-0 flex items-center justify-center text-black">
                {item.name ? item.name.slice(0, 1).toUpperCase() : ""}
              </p>
              <button
                className="px-4 py-8 hover:underline hover:cursor-pointer font-extrabold text-white hover:text-gray-200"
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
            <div className="w-1/9">
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
                <motion.button
                  className="bg-neutral-800 hover:bg-neutral-700 text-white border-2 border-neutral-500 w-12 rounded-s-md cursor-pointer p-1 disabled:bg-neutral-600 disabled:hover:cursor-not-allowed"
                  onClick={() => {
                    updateUserPoints(item._id, 10);
                  }}
                  disabled={item.points >= 100}
                  whileTap={{ scale: 0.9 }}
                >
                  +
                </motion.button>
                <motion.button
                  className="bg-neutral-800 hover:bg-neutral-700 text-white w-12 border-t border-b border-neutral-500 cursor-pointer p-1 disabled:bg-neutral-600 disabled:hover:cursor-not-allowed"
                  onClick={() => {
                    updateUserPoints(item._id, -10);
                  }}
                  disabled={item.points <= 0}
                  whileTap={{ scale: 0.9 }}
                >
                  -
                </motion.button>
                <motion.button
                  className="bg-neutral-800 hover:bg-neutral-700 text-white w-12 border-2 rounded-e-md border-neutral-500 cursor-pointer p-1"
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FontAwesomeIcon icon={faTrash} className="text-red-400" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {showUserModal && (
          <UserModal
            showUserModal={showUserModal}
            setShowUserModal={setShowUserModal}
            user={item}
            key="user-modal"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default User;
