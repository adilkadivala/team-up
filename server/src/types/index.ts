export interface UserRegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface HackathonInput {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  isOnline: boolean;
  organizer: string;
  websiteUrl?: string;
  tags: string[];
  prizes: string[];
}

export interface JwtPayload {
  userId: string;
  email: string;
}

import { Request } from "express";

export interface AuthRequest extends Request {
  headers: Request["headers"] & {
    authorization?: string;
    "x-clerk-user-id"?: string;
    "x-clerk-user-email"?: string;
  };
  user?: {
    id: string;
    email: string;
    name?: string;
    role?: string;
    avatarUrl?: string;
    password?: string;
  };
  params: {
    [key: string]: string;
  };
}

export interface Subscribe {
  firstname: string;
  lastname?: string;
  email: string;
  subject?: string;
  message: string;
}
