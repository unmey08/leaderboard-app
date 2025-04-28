const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  // if DB connected, don't connect again
  if (connected) {
    console.log("Mongo DB is already connected");
    return;
  }

  //connect to Mongo DB
  try {
    await mongoose.connect(process.env.MONGO_URI);
    connected = true;
    console.log("DB Connected");
  } catch (err) {
    console.log(err);
  }
};

connectDB();

app.use("/users", userRoutes);

module.exports = app;
