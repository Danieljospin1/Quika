
import { verifyAccessToken } from "../utils/jwt.js";
import AppError from "../utils/AppError.js";

export function authenticate(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return next(new AppError("Authentication token required", 401));
  }

  const token = authorization.slice("Bearer ".length).trim();

  if (!token) {
    return next(new AppError("Authentication token required", 401));
  }

  try {
    const payload = verifyAccessToken(token);

    if (
      typeof payload === "string" ||
      !payload.sub ||
      !payload.role
    ) {
      throw new Error("Invalid token payload");
    }

    req.auth = {
      id: payload.sub,
      role: payload.role,
    };

    next();
  } catch {
    next(new AppError("Invalid or expired token", 401));
  }
}

export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.auth || !allowedRoles.includes(req.auth.role)) {
      return next(new AppError("Access forbidden", 403));
    }

    next();
  };
}
