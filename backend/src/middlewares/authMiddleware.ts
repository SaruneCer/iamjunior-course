import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface UserPayload {
  id: string;
  email: string;
  iat: number; 
  exp: number; 
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Authorization header missing or does not start with 'Bearer'");
    res.status(401).send({ error: "Not authenticated" });
    return;
  }

  try {
    const token = authHeader.split(" ")[1];
    console.log("JWT Token:", token);

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    console.log("JWT Payload:", payload);

    if (!payload.email) {
      throw new Error("JWT does not contain email");
    }

    req.currentUser = payload;
    console.log("User authenticated:", req.currentUser);
  } catch (err) {
    console.log("Authentication error:", err);
    res.status(401).send({ error: "Not authenticated" });
    return;
  }

  next();
};

export default authMiddleware;