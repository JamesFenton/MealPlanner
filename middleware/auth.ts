import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export const accessTokenHeader = "x-access-token";

export interface Payload {
  _id: string;
  name: string;
}

export default function(req: Request, res: Response, next: NextFunction) {
  const header = req.header(accessTokenHeader);
  if (!header) return res.status(401).send("Access token required");

  try {
    const payload = jwt.verify(header, config.jwtPrivateKey);
    req["user"] = payload;
    next();
  } catch (ex) {
    return res.status(403).send("Invalid token");
  }
}
