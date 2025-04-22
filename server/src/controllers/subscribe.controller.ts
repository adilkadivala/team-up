import { Request, Response } from "express";
import { subscribe } from "../services/subscribe.services";
import prisma from "../prisma";

export const createSubscription = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, subject, message } = req.body;

    if (!email || !firstname || !message) {
      return res
        .status(400)
        .json({ message: "Name, email, and message are required" });
    }

    const findUser = await prisma.subscribe.findUnique({
      where: {
        email,
      },
    });

    if (findUser?.email) {
      res.status(409).json({ message: "email already exist" });
    }

    const result = await subscribe({
      firstname,
      lastname,
      email,
      message,
      subject,
    });

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
