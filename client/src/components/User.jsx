import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { animate, AnimatePresence, motion } from "motion/react";
import goldMedal from "../assets/gold-medal.png";
import silverMedal from "../assets/silver-medal.png";
import bronzeMedal from "../assets/bronze-medal.png";

const User = ({
  item,
  index,
  deleteUser,
  updateUserPoints,
  setShowUserModal,
  setCurrentUser,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
              <p className="hidden md:flex rounded-full bg-pink-200 w-10 h-10 shrink-0 grow-0 items-center justify-center text-black">
                {item.name ? item.name.slice(0, 1).toUpperCase() : ""}
              </p>
              <button
                className="px-4 py-8 hover:underline hover:cursor-pointer font-extrabold text-white text-left hover:text-gray-200"
                onClick={() => {
                  setShowUserModal(true);
                  setCurrentUser(item);
                }}
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
                <div className="inline-block text-left">
                  <button
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  >
                    <FontAwesomeIcon
                      icon={faEllipsisV}
                      className="text-white"
                    />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-10 z-100 w-44 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-neutral-800 dark:border-gray-400 font-bold">
                      <ul className="py-1">
                        <li>
                          <button
                            className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-100 w-full text-left dark:text-gray-200 dark:hover:bg-gray-700"
                            onClick={() => {
                              updateUserPoints(item._id, 10);
                              setIsDropdownOpen(false);
                            }}
                          >
                            Add 10 points
                          </button>
                        </li>
                        <li>
                          <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left dark:text-gray-200 dark:hover:bg-gray-700"
                            onClick={() => {
                              updateUserPoints(item._id, -10);
                              setIsDropdownOpen(false);
                            }}
                          >
                            Subtract 10 points
                          </button>
                        </li>
                        <li>
                          <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left dark:text-gray-200 dark:hover:bg-gray-700"
                            onClick={() => {
                              handleDelete(item._id);
                              setIsDropdownOpen(false);
                            }}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
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
    </motion.div>
  );
};
export default User;
