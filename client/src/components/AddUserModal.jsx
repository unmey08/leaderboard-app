import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import DOMPurify from "dompurify";

const AddUserModal = ({ showAddUserModal, setShowAddUserModal, addUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // sanitize input to prevent xss attacks
  const sanitizeInput = (data) => {
    return {
      name: DOMPurify.sanitize(data.name),
      age: DOMPurify.sanitize(data.age),
      address: DOMPurify.sanitize(data.address),
    };
  };

  const onSubmit = (data) => {
    const sanitizedData = sanitizeInput(data);
    addUser(sanitizedData);
    setShowAddUserModal(false);
    reset(); // Reset the form after submission
  };
  return (
    <div
      className={`overflow-y-auto overflow-x-auto fixed z-50 flex justify-center items-start pt-20 w-full md:inset-0 h-[100%] max-h-full ${
        showAddUserModal ? "visible bg-slate-700/50" : "invisible"
      }`}
    >
      <motion.div
        className="p-4 w-full max-w-md max-h-full"
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
          transition: { duration: 0.2 },
        }}
        key="add-modal"
      >
        <div className="relative bg-slate-50 rounded-lg shadow-sm">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-lg font-semibold text-slate-700 ">Add User</h3>
            <button
              type="button"
              className="bg-transparent hover:text-gray-600 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center text-slate-700 hover:cursor-pointer"
              onClick={() => setShowAddUserModal(false)}
              aria-label="Close add user modal"
            >
              <FontAwesomeIcon icon={faClose} size="xl" />
            </button>
          </div>

          <form
            className="p-4 md:p-5 text-left"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-slate-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", {
                    required: "Name is required.",
                    maxLength: {
                      value: 64,
                      message: "Maximum 64 characters.",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Name can only contain alphabets.",
                    },
                  })}
                  className="bg-white border border-gray-300 text-slate-700 font-bold text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="age"
                  className="block mb-2 text-sm font-medium text-slate-700"
                >
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  {...register("age", {
                    required: "Age is required",
                    min: { value: 18, message: "Age must be greater than 18." },
                    max: { value: 80, message: "Age must be less than 80." },
                  })}
                  className="bg-white border border-gray-300 text-slate-700 font-bold text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm">{errors.age.message}</p>
                )}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-slate-700"
                >
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  {...register("address", {
                    required: "Address is required",
                    maxLength: {
                      value: 200,
                      message: "Maximum 200 characters.",
                    },
                  })}
                  className="bg-white border border-gray-300 text-slate-700 font-bold text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`text-white inline-flex items-center bg-violet-600 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:cursor-pointer ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Add user button"
            >
              Add user
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
export default AddUserModal;
