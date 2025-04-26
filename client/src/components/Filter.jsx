const Filter = () => {
  return (
    <div className="py-8">
      {/* <div class="sm:hidden">
        <label for="tabs" class="sr-only">
          Select your country
        </label>
        <select
          id="tabs"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Profile</option>
          <option>Dashboard</option>
          <option>setting</option>
          <option>Invoioce</option>
        </select>
      </div> */}
      <ul className="hidden text-md font-medium text-center text-gray-500 rounded-lg shadow-sm sm:flex dark:divide-gray-700 dark:text-gray-400">
        <li className="w-full focus-within:z-10">
          <button className="inline-block w-full p-4 text-black bg-gray-100 border-r border-gray-200 rounded-s-lg focus:ring-4  focus:outline-none dark:bg-white dark:text-black hover:dark:bg-neutral-700">
            Ranking
          </button>
        </li>
        <li className="w-full focus-within:z-10">
          <button className="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 focus:ring-4 focus:outline-none dark:bg-neutral-800 dark:text-white hover:cursor-pointer active hover:dark:bg-neutral-700">
            Sort alphabetically (A-Z)
          </button>
        </li>
        <li className="w-full focus-within:z-10">
          <button className="inline-block w-full p-4 bg-white border-s-0 border-gray-200 dark:border-neutral-800 rounded-e-lg focus:ring-4 focus:outline-none dark:bg-neutral-800 dark:text-white active hover:cursor-pointer hover:dark:bg-neutral-700">
            Sort by points
          </button>
        </li>
      </ul>
    </div>
  );
};
export default Filter;
