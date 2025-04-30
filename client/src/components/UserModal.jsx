import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";

const UserModal = ({ showUserModal, setShowUserModal, user }) => {
  return (
    <div
      className={`overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
        showUserModal ? "visible bg-slate-700/50" : "invisible"
      }`}
    >
      <motion.div
        className="relative w-full max-w-md max-h-full"
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
            stiffness: 200,
          },
        }}
        exit={{
          opacity: 0,
          scale: 0.5,
          transition: { duration: 0.2 },
        }}
        key="user-modal"
      >
        <button
          type="button"
          className="absolute z-100 left-100 top-2 text-slate-700 bg-transparent hover:text-gray-600 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:cursor-pointer"
          data-modal-toggle="crud-modal"
          onClick={() => setShowUserModal(false)}
        >
          <FontAwesomeIcon icon={faClose} size="xl" />
        </button>
        <div className="flex flex-col items-center relative py-12 px-8 w-full max-w-md max-h-full bg-slate-50 rounded-lg shadow-sm text-center">
          <p className="w-32 h-32 mb-3 rounded-full shadow-lg bg-pink-200 flex items-center justify-center font-bold text-6xl">
            {user.name.slice(0, 1).toUpperCase()}
          </p>
          <h5 className="mb-1 text-2xl font-medium text-slate-900">
            {user.name}
          </h5>
          <span className="text-md text-slate-900">
            <FontAwesomeIcon icon={faLocationDot} /> {user.address}
          </span>
          <span className="text-md text-slate-900">Age: {user.age}</span>
          <span className="text-md text-slate-900">Points: {user.points}</span>
        </div>
      </motion.div>
    </div>
  );
};
export default UserModal;
