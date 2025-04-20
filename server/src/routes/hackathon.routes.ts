import { Router } from "express";
import {
  createHackathon,
  getHackathonById,
  getHackathons,
  toggleHackathonInterest,
} from "../controllers/hackathon.controller";

const router = Router();

router.route("/create-hackathon").post(createHackathon as any);
router.get("/get-hackathon", getHackathons);
router.get("/get-hackathon/:id", getHackathonById as any);
router.post("/get-hackathon/:id/interest", toggleHackathonInterest as any);

export default router;
