import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asnycHandler.util.js";

const signup = asyncHandler(async (req, res) => {
  try {
    console.log(req.body)
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, role, password: hashedPassword });
    await user.save();
    res.status(201).send("User created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).send("Invalid username or password");
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).send("Invalid username or password");
      return;
    }
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.SECRET_KEY
    );

    // Respond with user details and token
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        // Add other user details as needed
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Login failed");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    console.log("delete" , req.params)
    await User.findByIdAndDelete(_id);
    res.status(200).send("User deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});

const editUser = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    const { username, role } = req.body;
    await User.findByIdAndUpdate(_id, { username, role });
    res.status(200).send("User updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user");
  }
});

export { signup, login, getAllUsers, deleteUser, editUser };
