import { Router } from "express";
import {
  getUserProfile,
  searchUsers,
  getAllUsers,
  updateUserProfile,
} from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.route("/search").get(authenticate as any, searchUsers);
router.route("/users").get(authenticate as any, getAllUsers as any);
router.route("/user/:id").get(authenticate as any, getUserProfile as any);
router.route("/profile").post(authenticate as any, updateUserProfile as any);

export default router;
