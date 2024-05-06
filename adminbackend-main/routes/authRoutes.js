import { Router } from "express";
import {
  deleteUser,
  editUser,
  getAllUsers,
  login,
  signup,
} from "../controllers/authCntroller.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/getusers").get(getAllUsers);
// Route to edit/update a user by ID
router.route("/users/:_id").delete(deleteUser);
router.route("/users/:_id").put(editUser);
export default router;
