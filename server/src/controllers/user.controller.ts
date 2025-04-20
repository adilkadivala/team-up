import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserProfile(id);

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return res.status(404).json({ message: error.message });
    }
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

export const updateUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const userId = req.user.id;
    const userData = req.body;

    const updatedUser = await userService.updateUserProfile(userId, userData);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Error updating user profile" });
  }
};

export const searchUsers = async (req: Request, res: Response) => {
  try {
    const { search, skills, location, hackathonId } = req.query;

    const skillsArray = skills
      ? ((Array.isArray(skills) ? skills : [skills]) as string[])
      : undefined;

    const users = await userService.searchUsers(
      search as string | undefined,
      skillsArray,
      location as string | undefined,
      hackathonId as string | undefined
    );

    res.status(200).json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Error searching users" });
  }
};
