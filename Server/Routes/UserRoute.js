const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../Controllers/UserController");
const verifyToken = require("../Middlewares/AuthMiddleware");

router.post('/register', registerUser);

router.post("/login", loginUser);

router.get("/", verifyToken, getUsers);

router.get("/:id", verifyToken, getUserById);

router.put("/:id", verifyToken, updateUser);

router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
