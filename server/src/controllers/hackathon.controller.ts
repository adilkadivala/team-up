import { Request, Response } from "express";
import * as hackathonService from "../services/hackathon.service";
import { AuthRequest, HackathonInput } from "../types";

export const createHackathon = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const hackathonData = req.body as unknown as HackathonInput;

    const userId = req.user.id;

    const hackathon = await hackathonService.createHackathon(
      hackathonData,
      userId
    );

    res.status(201).json(hackathon);
  } catch (error) {
    console.error("Error creating hackathon:", error);
    res.status(500).json({ message: "Error creating hackathon" });
  }
};

export const getHackathonsbySearch = async (req: Request, res: Response) => {
  try {
    const { search, location, isOnline, tag } = req.query;

    const hackathons = await hackathonService.getHackathons(
      search as string | undefined,
      location as string | undefined,
      isOnline === "true",
      tag as string | undefined
    );

    res.status(200).json(hackathons);
  } catch (error) {
    console.error("Error fetching hackathons:", error);
    res.status(500).json({ message: "Error fetching hackathons" });
  }
};

export const getHackathonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const hackathon = await hackathonService.getHackathonById(id);

    res.status(200).json(hackathon);
  } catch (error) {
    if (error instanceof Error && error.message === "Hackathon not found") {
      return res.status(404).json({ message: error.message });
    }
    console.error("Error fetching hackathon:", error);
    res.status(500).json({ message: "Error fetching hackathon" });
  }
};

export const toggleHackathonInterest = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { id } = req.params;
    const userId = req.user.id;

    const result = await hackathonService.toggleHackathonInterest(id, userId);

    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "Hackathon not found") {
      return res.status(404).json({ message: error.message });
    }
    console.error("Error toggling hackathon interest:", error);
    res.status(500).json({ message: "Error toggling hackathon interest" });
  }
};

export const getAllHackathon = async (req: Request, res: Response) => {
  try {
    const hackathons = await hackathonService.getAllHackathon();
    console.log(hackathons);
    res.status(200).json({ hackathons });
  } catch (error: any) {
    console.log(error.message);
  }
};
