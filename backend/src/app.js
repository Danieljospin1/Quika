
import express from "express";
import cors from "cors";
import helmet from "helmet";

import { env } from "./config/env.js";
import indexRoutes from "./routes/index.routes.js";
import {
  notFoundHandler,
  errorHandler,
} from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.frontendUrl,
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({
    name: "Quika API",
    version: "1.0.0",
    message: "Delivery management backend",
  });
});

app.use("/api/v1", indexRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
