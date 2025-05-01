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
          x: -300,
          y: 0,
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
          className="border border-slate-100 overflow-hidden my-2 rounded-2xl dark:bg-white outline-none text-gray-100 antialiased font-medium text-left shadow-lg shadow-slate-300"
          key={item._id}
        >
          <div className="flex justify-around items-center">
            <div className="w-1/10">
              {item.rank === 1 && <img src={goldMedal} className="h-8 w-8" />}
              {item.rank === 2 && <img src={silverMedal} className="h-8 w-8" />}
              {item.rank === 3 && <img src={bronzeMedal} className="h-8 w-8" />}
              {item.rank > 3 && (
                <p className="w-8 p-1 md:p-0 flex text-sm md:text-xl font-bold justify-center border border-slate-700 text-slate-700 rounded-full">
                  {item.rank}
                </p>
              )}
            </div>
            <div className="w-1/2 flex items-center">
              <p
                className="hidden md:flex rounded-full bg-pink-200 w-10 h-10 shrink-0 grow-0 items-center justify-center text-black hover:cursor-pointer hover:border-2"
                onClick={() => {
                  setShowUserModal(true);
                  setCurrentUser(item);
                }}
              >
                {item.name ? item.name.slice(0, 1).toUpperCase() : ""}
              </p>
              <button
                className="px-4 py-8 hover:underline hover:cursor-pointer font-bold text-slate-700 text-left hover:text-slate-950"
                onClick={() => {
                  setShowUserModal(true);
                  setCurrentUser(item);
                }}
                aria-label="Click on user"
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
                    aria-label="Action menu for user"
                  >
                    <FontAwesomeIcon
                      icon={faEllipsisV}
                      className="text-slate-700"
                    />
                  </button>
                  {/* Action menu for smaller screens */}
                  {isDropdownOpen && (
                    <motion.div
                      className="absolute right-10 z-100 w-44 bg-white border border-gray-200 rounded-md shadow-lg font-bold"
                      variants={{
                        initial: {
                          opacity: 0,
                        },
                        animate: {
                          opacity: 1,
                          transition: {
                            ease: ["easeInOut"],
                          },
                        },
                        exit: {
                          opacity: 0,
                          transition: {
                            ease: ["easeInOut"],
                          },
                        },
                      }}
                      key={item._id}
                      whileInView="animate"
                      initial="initial"
                    >
                      <ul className="py-1 text-slate-700">
                        <li>
                          <button
                            className="block px-4 py-2 text-sm w-full text-left"
                            onClick={() => {
                              updateUserPoints(item._id, 10);
                              setIsDropdownOpen(false);
                            }}
                            aria-label="Add 10 points"
                          >
                            Add 10 points
                          </button>
                        </li>
                        <li>
                          <button
                            className="block px-4 py-2 text-sm w-full text-left"
                            onClick={() => {
                              updateUserPoints(item._id, -10);
                              setIsDropdownOpen(false);
                            }}
                            aria-label="Subtract 10 points"
                          >
                            Subtract 10 points
                          </button>
                        </li>
                        <li>
                          <button
                            className="block px-4 py-2 text-sm w-full text-left"
                            onClick={() => {
                              handleDelete(item._id);
                              setIsDropdownOpen(false);
                            }}
                            aria-label="Delete user"
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </div>
              </div>
              {/* Action menu for medium to larget screens */}
              <div className="hidden md:flex">
                <motion.button
                  className="bg-white hover:bg-slate-100 text-slate-700 border-2 border-neutral-500 w-12 rounded-s-md cursor-pointer p-1 disabled:bg-gray-200 disabled:hover:cursor-not-allowed font-extrabold"
                  onClick={() => {
                    updateUserPoints(item._id, 10);
                  }}
                  disabled={item.points >= 100}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  aria-label="Add 10 points"
                >
                  +
                </motion.button>
                <motion.button
                  className="bg-white hover:bg-slate-100 text-slate-700 w-12 border-t-2 border-b-2 border-neutral-500 cursor-pointer p-1 disabled:bg-gray-200 disabled:hover:cursor-not-allowed font-extrabold"
                  onClick={() => {
                    updateUserPoints(item._id, -10);
                  }}
                  disabled={item.points <= 0}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  aria-label="Subtract 10 points"
                >
                  -
                </motion.button>
                <motion.button
                  className="bg-white hover:bg-slate-100 text-slate-700 w-12 border-2 rounded-e-md border-neutral-500 cursor-pointer p-1"
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  aria-label="Delete user"
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
