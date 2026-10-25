import { prisma } from "../../lib/prisma";
import type { reviewPayload } from "./review.enum";

const createReviewDB = async (payload: reviewPayload, userId: string) => {
  const { rating, comment, bookingId, serviceId } = payload;

  const booking = await prisma.booking.findUniqueOrThrow({
    where: { id: bookingId },
  });

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
