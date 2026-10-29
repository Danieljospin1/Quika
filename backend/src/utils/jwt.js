
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function createAccessToken({ id, role }) {
  return jwt.sign(
    { role },
    env.jwtSecret,
    {
      subject: id,
      expiresIn: env.jwtExpiresIn,
      issuer: "quika-api",
      audience: "quika",
    }
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.jwtSecret, {
    issuer: "quika-api",
    audience: "quika",
  });
}
