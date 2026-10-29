
import { Router } from "express";
import rateLimit from "express-rate-limit";

import {
  adminLogin,
  createPartner,
  getAllPartners,
} from "../controllers/admin.controller.js";

import { authenticate, authorizeRoles } from "../middleware/auth.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { adminLoginSchema } from "../validators/auth.validator.js";
import { createPartnerSchema } from "../validators/partner.validator.js";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post(
  "/auth/login",
  loginLimiter,
  validateBody(adminLoginSchema),
  adminLogin
);

router.post(
  "/partners",
  authenticate,
  authorizeRoles("admin"),
  validateBody(createPartnerSchema),
  createPartner
);

router.get(
  "/partners",
  authenticate,
  authorizeRoles("admin"),
  getAllPartners
);

export default router;
