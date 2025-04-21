// src/controllers/webhook.controller.ts
import { Request, Response } from "express";
import { Webhook } from "svix";
import prisma from "../prisma";

export const handleClerkWebhook = async (req: Request, res: Response) => {
  // Get the webhook signature from the headers
  const svixId = req.headers["svix-id"] as string;
  const svixTimestamp = req.headers["svix-timestamp"] as string;
  const svixSignature = req.headers["svix-signature"] as string;

  // If there's no signature, this isn't a valid webhook request
  if (!svixId || !svixTimestamp || !svixSignature) {
    return res.status(400).json({ error: "Missing svix headers" });
  }

  // Get the webhook secret from environment variables
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("Missing CLERK_WEBHOOK_SECRET environment variable");
    return res.status(500).json({ error: "Server configuration error" });
  }

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(webhookSecret);

  let evt: any;

  try {
    // Verify the webhook payload
    evt = wh.verify(JSON.stringify(req.body), {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).json({ error: "Invalid webhook signature" });
  }

  const { type, data } = evt;

  try {
    // Handle user creation
    if (type === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } = data;

      await prisma.user.create({
        data: {
          id,
          email: email_addresses[0].email_address,
          name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
          avatarUrl: image_url,
          // No password needed for Clerk users
        },
      });

      console.log(`User created: ${id}`);
    }

    // Handle user update
    else if (type === "user.updated") {
      const { id, email_addresses, first_name, last_name, image_url } = data;

      await prisma.user.update({
        where: { id },
        data: {
          email: email_addresses[0].email_address,
          name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
          avatarUrl: image_url,
        },
      });

      console.log(`User updated: ${id}`);
    }

    // Handle user deletion
    else if (type === "user.deleted") {
      const { id } = data;

      await prisma.user.delete({
        where: { id },
      });

      console.log(`User deleted: ${id}`);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
};
