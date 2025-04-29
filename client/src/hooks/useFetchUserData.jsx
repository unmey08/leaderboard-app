import { useState, useEffect } from "react";

const useFetchUserData = (baseUrl) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await fetch(`${baseUrl}/users`);

        if (!result.ok) {
          throw new Error(
            `Failed to fetch leaderboard data: ${result.statusText}`
          );
        }

        const response = await result.json();

        // Processing and ranking logic
        if (response.length > 1) {
          let sortedData = response.sort((a, b) => b.points - a.points);

          let rank = 1;
          for (let i = 0; i < sortedData.length; i++) {
            if (i > 0 && sortedData[i].points < sortedData[i - 1].points) {
              rank++;
            }
            sortedData[i].rank = rank;
          }
          setUsers(sortedData);
        } else if (response.length === 1) {
          response[0].rank = 1;
          setUsers(response);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.error("Error fetching leaderboard data.", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [baseUrl]);

  return { users, setUsers, isLoading, error };
};

export default useFetchUserData;
