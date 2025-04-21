import { Router } from "express";
import {
  getUserProfile,
  searchUsers,
  updateUserProfile,
} from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.route("/search").get(searchUsers);
router.route("/user/:id").get(getUserProfile as any);
router.route("/profile").put(authMiddleware as any, updateUserProfile as any);

export default router;
