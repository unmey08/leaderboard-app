const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [64, "Name cannot exceed 64 characters"],
  },
  age: {
    type: Number,
    required: true,
    min: [18, "Age has to be above 18"],
    max: [80, "Age has to be below 80"],
  },
  address: {
    type: String,
    required: true,
    trim: true,
    maxlength: [200, "Address cannot exceed 200 characters"],
  },
  points: {
    type: Number,
    default: 0,
    min: [0, "Points cannot be less than 0"],
    max: [100, "Points cannot exceed 100"],
  },
});

module.exports = mongoose.model("User", userSchema);
