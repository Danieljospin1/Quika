
import { Router } from "express";

import {
    createDelivery,
    getDeliveryById,
} from "../controllers/delivery.controller.js";

import {
    authenticate,
    authorizeRoles,
} from "../middleware/auth.middleware.js";

import { validateBody } from "../middleware/validate.middleware.js";
import { createDeliverySchema } from "../validators/delivery.validator.js";

const router = Router();

router.use(authenticate, authorizeRoles("partner"));

router.post(
    "/",
    validateBody(createDeliverySchema),
    createDelivery
);

router.get("/:id", getDeliveryById);

export default router;
