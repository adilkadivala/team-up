// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  console.log("hitte register");
  try {
    const { name, email, password = "teamup" } = req.body;

    console.log(req.body);

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
