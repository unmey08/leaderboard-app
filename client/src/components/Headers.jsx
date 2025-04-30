import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Headers = ({
  sortUsersAlphabetically,
  sortUsersPoints,
  alphabetSortOrder,
  pointsSortOrder,
}) => {
  return (
    <div className="flex justify-around items-center font-bold pt-8">
      <p className="w-1/10 hidden md:block">Rank</p>
      <div
        className="w-1/3 text-center md:text-left hover:cursor-pointer ml-5 md:ml-0"
        onClick={sortUsersAlphabetically}
      >
        Name{" "}
        <FontAwesomeIcon
          icon={
            alphabetSortOrder === "desc"
              ? faSortUp
              : alphabetSortOrder === "default"
              ? faSort
              : faSortDown
          }
          className="ml-1"
        />
      </div>
      <div className="w-1/2 hover:cursor-pointer" onClick={sortUsersPoints}>
        Points{" "}
        <FontAwesomeIcon
          icon={pointsSortOrder === "desc" ? faSortDown : faSortUp}
          className="ml-1"
        />
      </div>
      <p className="w-1/10 text-left hidden md:block">Actions</p>
    </div>
  );
};
export default Headers;
