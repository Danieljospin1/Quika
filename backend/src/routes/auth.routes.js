
import { Router } from "express";
import rateLimit from "express-rate-limit";

import { createPartnerToken } from "../controllers/auth.controller.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { partnerTokenSchema } from "../validators/auth.validator.js";

const router = Router();

const tokenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many token requests. Try again later.",
  },
});

router.post(
  "/token",
  tokenLimiter,
  validateBody(partnerTokenSchema),
  createPartnerToken
);

export default router;
