import { motion } from "motion/react";

const Pagination = ({ handlePageChange, pagination, totalPages }) => {
  if (totalPages > 1)
    return (
      <div className="flex justify-between items-center mt-4">
        <motion.button
          onClick={() => handlePageChange(-1)}
          disabled={pagination.currentPage === 1}
          className="bg-neutral-800 hover:bg-neutral-700 text-gray-100 md:w-32 md:px-4 p-4 md:py-2 rounded-xl cursor-pointer font-semibold disabled:cursor-not-allowed disabled:bg-neutral-500 flex justify-center items-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-3.5 h-3.5 md:mr-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          <span className="hidden md:block">Previous</span>
        </motion.button>
        <span className="font-extrabold text-lg">
          Page {pagination.currentPage} of {totalPages}
        </span>
        <motion.button
          onClick={() => handlePageChange(1)}
          disabled={pagination.currentPage === totalPages}
          className="bg-neutral-800 hover:bg-neutral-700 text-gray-100 md:w-32 p-4 md:px-4 md:py-2 rounded-xl cursor-pointer font-semibold disabled:cursor-not-allowed disabled:bg-neutral-500 flex justify-center items-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="hidden md:block">Next</span>
          <svg
            className="w-3.5 h-3.5 md:ml-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </motion.button>
      </div>
    );
};
export default Pagination;
