
import { createHash, randomBytes } from "node:crypto";

export function generateApiKey() {
  return `qka_live_${randomBytes(32).toString("hex")}`;
}

export function hashApiKey(apiKey) {
  return createHash("sha256").update(apiKey).digest("hex");
}
