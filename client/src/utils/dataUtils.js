// sort user data
export const sortData = (data, key, order = "asc") =>
  [...data].sort((a, b) =>
    order === "asc" ? a[key] - b[key] : b[key] - a[key]
  );

// rank the users, if two users have the same points, keep the same rank
export const assignRanks = (data) => {
  let rank = 1;
  return data.map((user, index) => {
    if (index > 0 && user.points < data[index - 1].points) {
      rank++;
    }
    return { ...user, rank };
  });
};
