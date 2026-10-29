
import app from "./app.js";
import { env } from "./config/env.js";
import { pool } from "./config/database.js";

async function startServer() {
  try {
    await pool.query("SELECT 1");

    const server = app.listen(env.port, () => {
      console.log(`Quika API running at http://localhost:${env.port}`);
      console.log(`Health check: http://localhost:${env.port}/api/v1/health`);
    });

    async function shutdown() {
      console.log("Shutting down Quika API...");

      server.close(async () => {
        try {
          await pool.end();
          process.exit(0);
        } catch (error) {
          console.error("Shutdown error:", error);
          process.exit(1);
        }
      });
    }

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Failed to start Quika API:", error.message);
    await pool.end();
    process.exit(1);
  }
}

startServer();
