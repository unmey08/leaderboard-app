const Searchbar = ({ searchText, handleSearch }) => {
  return (
    <input
      type="search"
      placeholder="Search..."
      className="block text-md border border-slate-600/40 bg-slate-600/40 placeholder-white py-2 px-4 rounded-lg w-full md:w-1/2 lg:w-1/3 text-white font-medium shadow-lg shadow-violet-700 focus:border focus:border-slate-600"
      value={searchText}
      onChange={handleSearch}
    />
  );
};
export default Searchbar;
