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
    <motion.div
      className={`overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
        showAddUserModal ? "visible bg-black/90" : "invisible"
      }`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      key="add-modal"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-neutral-800 dark:border-neutral-100">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add User
            </h3>
            <button
              type="button"
              className="bg-transparent hover:text-gray-400 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center text-gray-400 hover:cursor-pointer dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => setShowAddUserModal(false)}
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
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-800 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="age"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-800 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm">{errors.age.message}</p>
                )}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-800 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
              className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:cursor-pointer dark:focus:ring-blue-800 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Add user
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};
export default AddUserModal;
