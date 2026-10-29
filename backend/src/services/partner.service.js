
import {
  createPartner as insertPartner,
  listPartners as fetchPartners,
} from "../repositories/partner.repository.js";

import { generateApiKey, hashApiKey } from "../utils/api-key.js";
import AppError from "../utils/AppError.js";

export async function registerPartner({ name, slug }) {
  const apiKey = generateApiKey();
  const apiKeyHash = hashApiKey(apiKey);

  try {
    const partner = await insertPartner({
      name,
      slug,
      apiKeyHash,
    });

    return {
      partner,
      apiKey,
    };
  } catch (error) {
    if (error.code === "23505") {
      throw new AppError(
        "A partner with this slug or API key already exists",
        409
      );
    }

    throw error;
  }
}

export async function getPartners() {
  return fetchPartners();
}
