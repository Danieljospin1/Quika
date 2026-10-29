
import { findActivePartnerByApiKeyHash } from "../repositories/partner.repository.js";
import { hashApiKey } from "../utils/api-key.js";
import { createAccessToken } from "../utils/jwt.js";
import AppError from "../utils/AppError.js";
import { env } from "../config/env.js";

export async function issuePartnerToken(apiKey) {
  const apiKeyHash = hashApiKey(apiKey);
  const partner = await findActivePartnerByApiKeyHash(apiKeyHash);

  if (!partner) {
    throw new AppError("Invalid API key or inactive partner", 401);
  }

  const accessToken = createAccessToken({
    id: partner.id,
    role: "partner",
  });

  return {
    accessToken,
    tokenType: "Bearer",
    expiresIn: env.jwtExpiresIn,
    partner: {
      id: partner.id,
      name: partner.name,
      slug: partner.slug,
    },
  };
}
