const Searchbar = ({ searchText, handleSearch }) => {
  return (
    <input
      type="search"
      placeholder="Search..."
      className="block text-md border bg-neutral-800 placeholder-gray-100 border-neutral-800 py-2 px-4 rounded-lg w-full md:w-1/2 lg:w-1/3 text-gray-100 font-medium"
      value={searchText}
      onChange={handleSearch}
    />
  );
};
export default Searchbar;
