import { Router } from "express";
import { createSubscription } from "../controllers/subscribe.controller";

const router = Router();

router.route("/subscribe").post(createSubscription as any);

export default router;
