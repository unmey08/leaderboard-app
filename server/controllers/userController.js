const User = require("../models/User");

//get all users
exports.getUsers = async (req, res) => {
  const users = await User.find({});
  if (!users) {
    return res.json({ error: "No users found" }).status(404);
  }
  res.json(users).status(200);
};

//create a new user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ success: true, data: user }).status(201);
  } catch {
    res.json({ error: "Error adding record" }).status(500);
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ success: true }).status(204);
  } catch {
    res.json({ error: "Error deleting record" }).status(500);
  }
};

//reset points of all users
exports.resetPoints = async (req, res) => {
  try {
    await User.updateMany({}, { points: 0 });
    res.json({ success: true }).status(200);
  } catch {
    res.json({ error: "Error updating points" }).status(500);
  }
};

//update points for a user
exports.updateUserPoints = async (req, res) => {
  try {
    const { id } = req.params;
    const { delta } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.json({ error: "User not found" }).status(404);
    }
    user.points += delta;
    if (user.points < 0 || user.points > 100) {
      return res
        .status(400)
        .json({ error: "Points must remain between 0 and 100" });
    }
    await user.save();
    res.json(user).status(200);
  } catch {
    res.json({ error: "Error updating record" }).status(500);
  }
};
