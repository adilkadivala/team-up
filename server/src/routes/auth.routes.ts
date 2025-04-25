import { Router } from "express";
import { login, register, refresh } from "../controllers/auth.controller";

const router = Router();

router.route("/register").post(register as any);
router.route("/login").post(login as any);
router.route("/refresh").post(refresh as any);

export default router;
