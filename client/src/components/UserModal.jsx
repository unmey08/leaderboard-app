import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";

const UserModal = ({ showUserModal, setShowUserModal, user }) => {
  return (
    <motion.div
      className={`overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
        showUserModal ? "visible bg-black/90" : "invisible"
      }`}
      initial={{
        opacity: 0,
        y: 60,
        scale: 0.2,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 100,
        },
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.6 },
      }}
      key="user-modal"
    >
      <div className="relative w-full max-w-md max-h-full">
        <button
          type="button"
          className="absolute z-100 left-100 top-2 text-gray-400 bg-transparent hover:bg-gray-600 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white hover:cursor-pointer"
          data-modal-toggle="crud-modal"
          onClick={() => setShowUserModal(false)}
        >
          <FontAwesomeIcon icon={faClose} size="xl" />
        </button>
        <div className="flex flex-col items-center relative px-12 py-24 w-full max-w-md max-h-full bg-white rounded-lg shadow-sm dark:bg-neutral-800 dark:border-neutral-100 text-center">
          <p className="w-32 h-32 mb-3 rounded-full shadow-lg bg-pink-200 flex items-center justify-center font-bold dark:text-black text-6xl">
            {user.name.slice(0, 1).toUpperCase()}
          </p>
          <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">
            {user.name}
          </h5>
          <span className="text-md text-gray-500 dark:text-gray-400">
            <FontAwesomeIcon icon={faLocationDot} /> {user.address}
          </span>
          <span className="text-md text-gray-500 dark:text-gray-400">
            Age: {user.age}
          </span>
          <span className="text-md text-gray-500 dark:text-gray-400">
            Points: {user.points}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
export default UserModal;
