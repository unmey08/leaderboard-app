import Searchbar from "./Searchbar";
import UsersList from "./UsersList";

const Leaderboard = () => {
  return (
    <div className="container w-full md:w-3/4 mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-4xl font-semibold leading-tight mb-8">
            Leaderboard 🏆
          </h2>
        </div>
        <div className="flex justify-between">
          <Searchbar />
          <button className="bg-neutral-800 hover:bg-neutral-700 text-gray-100 w-1/8 rounded-xl cursor-pointer">
            Add User
          </button>
        </div>
        <div className="flex justify-between items-center pt-8 text-left">
          <p>Rank</p>
          <p>Name</p>
          <p>Points</p>
        </div>
        <UsersList />
      </div>
    </div>
  );
};
export default Leaderboard;
