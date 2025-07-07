import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    // Add more user fields if needed
  };
}
