import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import prisma from "../prisma";
import { AuthRequest } from "../types";
import { JwtPayload } from "../types";

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (authHeader.includes("clerk")) {
      const clerkUserId = req.headers["x-clerk-user-id"] as string;

      if (!clerkUserId) {
        return res.status(401).json({ message: "Invalid Clerk token" });
      }

      const user = await prisma.user.findUnique({
        where: { id: clerkUserId },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = { id: user.id, email: user.email }; // 👈 match your AuthRequest type
      return next();
    }

    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    if (typeof decoded !== "object" || !("userId" in decoded)) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = { id: user.id, email: user.email };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
