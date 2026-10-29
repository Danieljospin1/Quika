
import {
    createDelivery as insertDelivery,
    findDeliveryByIdAndPartnerId,
} from "../repositories/delivery.repository.js";

import AppError from "../utils/AppError.js";

export async function createPartnerDelivery(partnerId, input) {
    try {
        return await insertDelivery({
            partnerId,
            ...input,
        });
    } catch (error) {
        if (error.code === "23505") {
            throw new AppError(
                "This external order ID has already been used by your partner",
                409
            );
        }

        throw error;
    }
}

export async function getPartnerDelivery(partnerId, deliveryId) {
    if (
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
            deliveryId
        )
    ) {
        throw new AppError("Invalid delivery ID", 400);
    }
    const delivery = await findDeliveryByIdAndPartnerId(
        deliveryId,
        partnerId
    );

    if (!delivery) {
        throw new AppError("Delivery not found", 404);
    }

    return delivery;
}
