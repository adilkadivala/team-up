import { Router } from "express";
import {
  getUserProfile,
  searchUsers,
  updateUserProfile,
} from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.route("/search").get(searchUsers);
router.route("/user/:id").get(getUserProfile as any);
router.route("/profile").put(authenticate as any, updateUserProfile as any);

export default router;
