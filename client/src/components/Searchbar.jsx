const Searchbar = () => {
  return (
    <input
      type="search"
      placeholder="Search..."
      className="block text-md border bg-neutral-800 placeholder-gray-100 border-neutral-800 py-2 px-4 rounded-lg w-1/3 text-gray-100 font-medium"
      value={""}
      onChange={(e) => {
        e.preventDefault();
      }}
    />
  );
};
export default Searchbar;
