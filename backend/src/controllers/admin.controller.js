
import { loginAdmin } from "../services/admin.service.js";
import {
  registerPartner,
  getPartners,
} from "../services/partner.service.js";

export async function adminLogin(req, res, next) {
  try {
    const result = await loginAdmin(req.body);

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function createPartner(req, res, next) {
  try {
    const result = await registerPartner(req.body);

    res.status(201).json({
      success: true,
      message: "Partner registered successfully. Save the API key now; it will not be shown again.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllPartners(req, res, next) {
  try {
    const partners = await getPartners();

    res.status(200).json({
      success: true,
      data: partners,
    });
  } catch (error) {
    next(error);
  }
}
