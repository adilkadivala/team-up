import { Router } from "express";
import {
  login,
  register,
  syncClerkUser,
  getCurrentUser,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.route("/register").post(register as any);
router.route("/login").post(login as any);
router.route("/sync-user").post(syncClerkUser as any);
router.route("/me").get(authMiddleware as any, getCurrentUser as any);

export default router;
