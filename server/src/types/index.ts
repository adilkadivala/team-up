export interface userRegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface userLoginInput {
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

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export interface Subscribe {
  firstname: string;
  lastname?: string;
  email: string;
  subject?: string;
  message: string;
}
