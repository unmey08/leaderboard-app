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
      <div className="w-1/3 text-left hover:cursor-pointer">
        Name{" "}
        <FontAwesomeIcon
          icon={
            alphabetSortOrder === "desc"
              ? faSortUp
              : alphabetSortOrder === "default"
              ? faSort
              : faSortDown
          }
          onClick={sortUsersAlphabetically}
          className="ml-1"
        />
      </div>
      <div className="w-1/2 hover:cursor-pointer">
        Points{" "}
        <FontAwesomeIcon
          icon={pointsSortOrder === "desc" ? faSortDown : faSortUp}
          onClick={sortUsersPoints}
          className="ml-1"
        />
      </div>
      <p className="w-1/10 text-left hidden md:block">Actions</p>
    </div>
  );
};
export default Headers;
