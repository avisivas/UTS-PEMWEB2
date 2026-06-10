import { Router } from "express";
import {
  login,
  register,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";

const router = Router();

// Auth
router.post("/register", register);
router.post("/login", login);

// CRUD User
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;