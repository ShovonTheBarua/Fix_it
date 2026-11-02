import { prisma } from "../../lib/prisma";
import type { reviewPayload } from "./review.enum";

const createReviewDB = async (payload: reviewPayload, userId: string) => {
  const { rating, comment, bookingId, serviceId } = payload;

  //   const pay = await prisma.payment.findUniqueOrThrow({
  //     where: {bookingId}
  //   })

  const booking = await prisma.booking.findUniqueOrThrow({
    where: { id: bookingId },
  });

  if (booking.status !== "PAID") {
    throw new Error("you haven't booked the service yet!!");
  }

  if (!booking) {
    throw new Error("no booking found");
  }

  if (booking.userId !== userId) {
    throw new Error("forbidden access.");
  }

  const result = await prisma.review.create({
    data: {
      rating,
      comment,
      bookingId,
      serviceId,
      userId,
    },
  });
  return result;
};

export const reviewService = {
  createReviewDB,
};
