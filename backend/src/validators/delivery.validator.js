
import { z } from "zod";

const latitude = z.number().finite().min(-90).max(90);
const longitude = z.number().finite().min(-180).max(180);

export const createDeliverySchema = z.object({
  externalOrderId: z.string().trim().min(1).max(100),

  pickupAddress: z.string().trim().min(1).max(1000),
  pickupLatitude: latitude,
  pickupLongitude: longitude,

  destinationAddress: z.string().trim().min(1).max(1000),
  destinationLatitude: latitude,
  destinationLongitude: longitude,
});
