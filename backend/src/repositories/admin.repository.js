
import { pool } from "../config/database.js";

export async function findAdminByEmail(email) {
  const result = await pool.query(
    `SELECT id, full_name, email, password_hash
     FROM admins
     WHERE LOWER(email) = LOWER($1)
     LIMIT 1`,
    [email]
  );

  return result.rows[0] ?? null;
}

export async function createAdmin({
  fullName,
  email,
  passwordHash,
}) {
  const result = await pool.query(
    `INSERT INTO admins (full_name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, full_name, email, created_at`,
    [fullName, email, passwordHash]
  );

  return result.rows[0];
}
