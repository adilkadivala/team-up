import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { UserRegisterInput, UserLoginInput } from "../types";
import { sendWelcomeEmail } from "./email.service";

export const register = async (userData: UserRegisterInput) => {
  const { name, email, password } = userData;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Send welcome email
  await sendWelcomeEmail(email, name);

  // Generate JWT token
  const token = jwt.sign({ userId: user.id, email: user.email }, "secret", {
    expiresIn: "2d",
  });

  // Return user without password and token
  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};

export const login = async (credentials: UserLoginInput) => {
  const { email, password } = credentials;

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check password
  if (!user.password) {
    throw new Error("Password is missing for the user");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, "secret", {
    expiresIn: "2d",
  });

  // Return user without password and token
  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};
