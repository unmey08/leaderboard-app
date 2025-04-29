import { motion } from "motion/react";

const Pagination = ({ handlePageChange, pagination, totalPages }) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <motion.button
        onClick={() => handlePageChange(-1)}
        disabled={pagination.currentPage === 1}
        className="bg-neutral-800 hover:bg-neutral-700 text-gray-100 md:w-32 px-4 py-2 rounded-xl cursor-pointer font-semibold disabled:cursor-not-allowed"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Previous
      </motion.button>
      <span className="font-extrabold text-lg">
        Page {pagination.currentPage} of {totalPages}
      </span>
      <motion.button
        onClick={() => handlePageChange(1)}
        disabled={pagination.currentPage === totalPages}
        className="bg-neutral-800 hover:bg-neutral-700 text-gray-100 md:w-32 px-4 py-2 rounded-xl cursor-pointer font-semibold disabled:cursor-not-allowed"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Next
      </motion.button>
    </div>
  );
};
export default Pagination;
