import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import prisma from "../prisma";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const result = await authService.register({ name, email, password });

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User with this email already exists") {
        return res.status(400).json({ message: error.message });
      }
    }
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const result = await authService.login({ email, password });

    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Invalid email or password") {
        return res.status(401).json({ message: error.message });
      }
    }
    res.status(500).json({ message: "Error logging in" });
  }
};

export const syncClerkUser = async (req: Request, res: Response) => {
  const { id, email, name, avatarUrl } = req.body;

  if (!id || !email || !name) {
    return res.status(400).json({ error: "Missing required user fields." });
  }

  try {
    const user = await prisma.user.upsert({
      where: { id },
      update: {
        email,
        name,
        avatarUrl,
        password: "clerk", // or null if you make it optional
      },
      create: {
        id,
        email,
        name,
        avatarUrl,
        password: "clerk", // just to satisfy schema
      },
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Failed to sync Clerk user:", error);
    res.status(500).json({ error: "Failed to sync user." });
  }
};
