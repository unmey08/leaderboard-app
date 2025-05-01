// import { useState } from 'react'
import Leaderboard from "./components/Leaderboard";
import "./App.css";

function App() {
  return (
    <main className="background-fade h-fit min-h-full max-h-6xl scroll-auto w-full absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-t from-indigo-500 to-violet-500 px-4 lg:px-12">
      <Leaderboard />
    </main>
  );
}

export default App;
