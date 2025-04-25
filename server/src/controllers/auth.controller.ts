// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name, and email are required" });
    }

    const result = await authService.register({ name, email, password });

    res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "User with this email already exists") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: { message: error.message } });
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

    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Login Error:", error);

    if (error.message === "Invalid email or password") {
      return res.status(401).json({ message: error.message });
    }

    if (error.message === "Account not found") {
      return res.status(402).json({ message: error.message });
    }

    return res.status(500).json({ message: "Error logging in" });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const result = await authService.login({ email, password });

    // Only return tokens
    return res.status(200).json({
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  } catch (err: any) {
    return res.status(403).json({ message: err.message });
  }
};
