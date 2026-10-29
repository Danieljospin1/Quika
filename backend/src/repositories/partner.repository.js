
import { pool } from "../config/database.js";

export async function findActivePartnerByApiKeyHash(apiKeyHash) {
  const result = await pool.query(
    `SELECT id, name, slug, status
     FROM partners
     WHERE api_key_hash = $1
       AND status = 'ACTIVE'
     LIMIT 1`,
    [apiKeyHash]
  );

  return result.rows[0] ?? null;
}
