
import { Router } from "express";
import { pool } from "../config/database.js";
import authRoutes from "./auth.routes.js";
import adminRoutes from "./admin.routes.js";
import deliveryRoutes from "./delivery.routes.js";

const router = Router();

router.get("/health", async (req, res, next) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      success: true,
      message: "Quika API is running",
      database: "connected",
    });
  } catch (error) {
    next(error);
  }
});

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/deliveries", deliveryRoutes);



export default router;
