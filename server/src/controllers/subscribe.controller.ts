import { Request, Response } from "express";
import { subscribe } from "../services/subscribe.services";

export const createSubscription = async (req: Request, res: Response) => {
  console.log("control-hited");
  try {
    const { firstname, lastname, email, subject, message } = req.body;
    console.log("📧 [EMAIL SERVICE] Sending email to:", email);

    if (!email || !firstname || !message) {
      return res
        .status(400)
        .json({ message: "Name, email, and message are required" });
    }

    const result = await subscribe({
      firstname,
      lastname,
      email,
      message,
      subject,
    });

    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User with this email already exists") {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
};
