
import bcrypt from "bcryptjs";

import { findAdminByEmail } from "../repositories/admin.repository.js";
import { createAccessToken } from "../utils/jwt.js";
import { env } from "../config/env.js";
import AppError from "../utils/AppError.js";

export async function loginAdmin({ email, password }) {
  const admin = await findAdminByEmail(email);

  if (!admin) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordMatches = await bcrypt.compare(
    password,
    admin.password_hash
  );

  if (!passwordMatches) {
    throw new AppError("Invalid email or password", 401);
  }

  const accessToken = createAccessToken({
    id: admin.id,
    role: "admin",
  });

  return {
    accessToken,
    tokenType: "Bearer",
    expiresIn: env.jwtExpiresIn,
    admin: {
      id: admin.id,
      fullName: admin.full_name,
      email: admin.email,
    },
  };
}
