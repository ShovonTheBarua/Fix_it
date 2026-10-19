import { prisma } from "../../lib/prisma";
import type { bookingPayload } from "./booking.interface";

const createBookingDB = async (payload: bookingPayload, userId: string) => {
  const { serviceId, description } = payload;
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) {
    throw new Error("Service doesn't exist!!");
  }

  const booking = await prisma.booking.create({
    data: {
      description,
      userId,
      serviceId,
      technicianId: service.technicianId,
    },
  });

  return booking;
};

export const bookingService = {
  createBookingDB,
};
