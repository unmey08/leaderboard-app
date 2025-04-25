// import { useState } from 'react'

import "./App.css";

function App() {
  return (
    <>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="cursor-pointer border border-gray-200">Name</th>
            <th>Age</th>
            <th>Address</th>
            <th className="cursor-pointer border border-gray-200">Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {sortedUsers.map(user => ( */}
          <tr key={"1"}>
            <td className="border border-gray-200 cursor-pointer">{"Unmey"}</td>
            <td className="border border-gray-200">{25}</td>
            <td className="border border-gray-200">{"kajshd"}</td>
            <td className="border border-gray-200">{50}</td>
          </tr>
          {/* ))} */}
        </tbody>
      </table>
    </>
  );
}

export default App;
