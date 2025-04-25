// auth.service.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { UserRegisterInput, UserLoginInput } from "../types";
import { sendWelcomeEmail } from "./email.service";
import config from "../config";

// Use separate secrets for access and refresh tokens
const ACCESS_TOKEN_SECRET = config.jwtSecret;
const REFRESH_TOKEN_SECRET = config.jwtRefersh;

// Generate access and refresh tokens
const generateTokens = (user: { id: string; email: string }) => {
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" } // Change to 15 minutes
  );
  const refreshToken = jwt.sign(
    { userId: user.id, email: user.email },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } // Change to 7 days
  );
  return { accessToken, refreshToken };
};

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

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user);

  // Return user without password and tokens
  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, accessToken, refreshToken };
};

export const login = async (credentials: UserLoginInput) => {
  const { email, password } = credentials;

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Account not found");
  }

  // Check password
  if (!user?.password) {
    throw new Error("Password is missing for the user");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user);

  // Return user without password and tokens
  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, accessToken, refreshToken };
};
