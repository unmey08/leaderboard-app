const express = require("express");
const {
  getUsers,
  createUser,
  deleteUser,
  resetPoints,
  updateUserPoints,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.post("/reset", resetPoints);
router.patch("/:id/points", updateUserPoints);

module.exports = router;
