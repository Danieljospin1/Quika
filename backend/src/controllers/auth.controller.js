
import { issuePartnerToken } from "../services/auth.service.js";

export async function createPartnerToken(req, res, next) {
  try {
    const result = await issuePartnerToken(req.body.apiKey);

    res.status(200).json({
      success: true,
      message: "Access token issued successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
