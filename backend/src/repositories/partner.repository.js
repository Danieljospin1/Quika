
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


export async function createPartner({
  name,
  slug,
  apiKeyHash,
}) {
  const result = await pool.query(
    `INSERT INTO partners (name, slug, api_key_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, slug, status, created_at`,
    [name, slug, apiKeyHash]
  );

  return result.rows[0];
}

export async function listPartners() {
  const result = await pool.query(
    `SELECT id, name, slug, status, created_at
     FROM partners
     ORDER BY created_at DESC`
  );

  return result.rows;
}

