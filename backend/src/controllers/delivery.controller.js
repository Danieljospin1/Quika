
import {
  createPartnerDelivery,
  getPartnerDelivery,
} from "../services/delivery.service.js";

export async function createDelivery(req, res, next) {
  try {
    const delivery = await createPartnerDelivery(
      req.auth.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Delivery created successfully",
      data: delivery,
    });
  } catch (error) {
    next(error);
  }
}

export async function getDeliveryById(req, res, next) {
  try {
    const delivery = await getPartnerDelivery(
      req.auth.id,
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: delivery,
    });
  } catch (error) {
    next(error);
  }
}
