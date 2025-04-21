// src/routes/webhook.routes.ts
import { Router } from "express";
import { handleClerkWebhook } from "../controllers/webhook.controller";
import express from "express";

const router = Router();

// Use raw body parser for webhook verification
router
  .route("/clerk-user-entry")
  .post(express.raw({ type: "application/json" }), handleClerkWebhook as any);

export default router;
