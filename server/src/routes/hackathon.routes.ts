import { Router } from "express";
import {
  createHackathon,
  getHackathonById,
  getHackathonsbySearch,
  getAllHackathon,
  toggleHackathonInterest,
} from "../controllers/hackathon.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router
  .route("/create-hackathon")
  .post(authenticate as any, createHackathon as any);

router
  .route("/get-hackathon-byquery")
  .get(authenticate as any, getHackathonsbySearch);

router
  .route("/get-hackathon/:id")
  .get(authenticate as any, getHackathonById as any);

router
  .route("/get-hackathon/:id/interest")
  .post(authenticate as any, toggleHackathonInterest as any);

router
  .route("/getallhackathons")
  .get(authenticate as any, getAllHackathon as any);

export default router;
