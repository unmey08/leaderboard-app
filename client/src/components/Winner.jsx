import goldMedal from "../assets/gold-medal.png";
import bronzeMedal from "../assets/bronze-medal.png";
import silverMedal from "../assets/silver-medal.png";
import { motion } from "motion/react";

const Winner = ({ winner, runnerup, secondRunnerup }) => {
  return (
    <section className="pt-8 md:pt-12 pb-4 mx-auto">
      <h2 className="text-2xl my-1 md:my-5 font-extrabold">Current Winners</h2>
      <div className="flex items-center justify-center">
        {runnerup && (
          <motion.div
            className="m-8 mt-40 flex justify-end items-center flex-col"
            initial={{
              opacity: 0,
              y: 60,
              scale: 0.2,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 200,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              transition: { duration: 0.2 },
            }}
          >
            <div className="relative w-16 h-16 md:w-32 md:h-32 mb-3 rounded-full shadow-lg bg-pink-200 border-4 border-slate-800 text-slate-700 flex items-center justify-center font-bold text-xl md:text-6xl">
              {runnerup.name.slice(0, 1).toUpperCase()}
              <img
                src={silverMedal}
                className="absolute top-12 md:top-25 h-7 w-7 md:w-10 md:h-10"
              />
            </div>
            <h5 className="mb-1 text-md md:text-2xl font-bold text-white">
              {runnerup.name.split(" ")[0]}
            </h5>
            <span className="text-md text-white bg-white/50 px-4 py-2 rounded-xl font-bold">
              {runnerup.points} <span className="hidden md:inline">points</span>
            </span>
          </motion.div>
        )}
        {runnerup && (
          <motion.div
            className="m-8 flex justify-center items-center flex-col"
            initial={{
              opacity: 0,
              y: 60,
              scale: 0.2,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 200,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              transition: { duration: 0.2 },
            }}
          >
            <div className="relative w-16 h-16 md:w-32 md:h-32 mb-3 rounded-full shadow-lg bg-pink-200 border-4 border-slate-800 text-slate-700 flex items-center justify-center font-bold text-xl md:text-6xl">
              {winner.name.slice(0, 1).toUpperCase()}
              <img
                src={goldMedal}
                className="absolute top-12 md:top-25 h-7 w-7 md:w-10 md:h-10"
              />
            </div>
            <h5 className="mb-1 text-md md:text-2xl font-bold text-white">
              {winner.name.split(" ")[0]}
            </h5>
            <span className="text-md text-white bg-white/50 px-4 py-2 rounded-xl font-bold">
              {winner.points} <span className="hidden md:inline">points</span>
            </span>
          </motion.div>
        )}
        {secondRunnerup && (
          <motion.div
            className="m-8 mt-40 flex justify-end items-center flex-col"
            initial={{
              opacity: 0,
              y: 60,
              scale: 0.2,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 200,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              transition: { duration: 0.2 },
            }}
          >
            <div className="relative w-16 h-16 md:w-32 md:h-32 mb-3 rounded-full shadow-lg bg-pink-200 border-4 border-slate-800 text-slate-700 flex items-center justify-center font-bold text-xl md:text-6xl">
              {secondRunnerup.name.slice(0, 1).toUpperCase()}
              <img
                src={bronzeMedal}
                className="absolute top-12 md:top-25 h-7 w-7 md:w-10 md:h-10"
              />
            </div>
            <h5 className="mb-1 text-md md:text-2xl font-bold text-white">
              {secondRunnerup.name.split(" ")[0]}
            </h5>
            <span className="text-md text-white bg-white/50 px-4 py-2 rounded-xl font-bold">
              {secondRunnerup.points}{" "}
              <span className="hidden md:inline">points</span>
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
};
export default Winner;
