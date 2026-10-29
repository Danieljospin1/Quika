
import { pool } from "../config/database.js";

const deliveryFields = `
  id,
  partner_id AS "partnerId",
  rider_id AS "riderId",
  external_order_id AS "externalOrderId",
  pickup_address AS "pickupAddress",
  pickup_latitude AS "pickupLatitude",
  pickup_longitude AS "pickupLongitude",
  destination_address AS "destinationAddress",
  destination_latitude AS "destinationLatitude",
  destination_longitude AS "destinationLongitude",
  status,
  created_at AS "createdAt",
  updated_at AS "updatedAt"
`;

export async function createDelivery({
  partnerId,
  externalOrderId,
  pickupAddress,
  pickupLatitude,
  pickupLongitude,
  destinationAddress,
  destinationLatitude,
  destinationLongitude,
}) {
  const result = await pool.query(
    `INSERT INTO deliveries (
      partner_id,
      external_order_id,
      pickup_address,
      pickup_latitude,
      pickup_longitude,
      destination_address,
      destination_latitude,
      destination_longitude
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING ${deliveryFields}`,
    [
      partnerId,
      externalOrderId,
      pickupAddress,
      pickupLatitude,
      pickupLongitude,
      destinationAddress,
      destinationLatitude,
      destinationLongitude,
    ]
  );

  return result.rows[0];
}

export async function findDeliveryByIdAndPartnerId(
  deliveryId,
  partnerId
) {
  const result = await pool.query(
    `SELECT ${deliveryFields}
     FROM deliveries
     WHERE id = $1 AND partner_id = $2
     LIMIT 1`,
    [deliveryId, partnerId]
  );

  return result.rows[0] ?? null;
}
