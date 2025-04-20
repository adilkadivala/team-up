import { Router } from "express";
import { login, register, syncClerkUser } from "../controllers/auth.controller";

const router = Router();

router.route("/register").post(register as any);
router.route("/login").post(login as any);
router.route("/sync-user").post(syncClerkUser as any);

export default router;
