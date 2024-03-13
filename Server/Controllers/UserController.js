const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register new user || POST Request
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check exist email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User Register Success", newUser });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Login user || POST Request
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ message: "Login Success", user, token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get all users || GET Request
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get user by ID || GET Request
const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update a user || PUT Request
const updateUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { name, email, password },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// Delete a user || DELETE Request
const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
