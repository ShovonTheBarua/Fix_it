import { prisma } from "../../lib/prisma";
import type { bookingPayload } from "./booking.interface";

const createBookingDB = async (payload: bookingPayload, userId: string) => {
  const { serviceId, availabilityId, description } = payload;

  const result = await prisma.$transaction(async (tx) => {
    const slot = await tx.technicianAvailability.findUnique({
      where: { id: availabilityId },
    });

    if (!slot) {
      throw new Error("slot does not found");
    }

    if (slot.isBooked) {
      throw new Error("this slot is already booked.");
    }

    await tx.technicianAvailability.updateMany({
      where: { id: availabilityId, isBooked: false },
      data: {
        isBooked: true,
      },
    });

    const service = await tx.service.findUniqueOrThrow({
      where: { id: serviceId },
    });

    const technicianId = service?.technicianId;

    if (technicianId != slot.technicianId) {
      throw new Error(
        "Invalid slot. Try to chose slot that belongs to technician",
      );
    }

    const booking = await tx.booking.create({
      data: {
        userId,
        technicianId,
        description,
        slotId: availabilityId,
        serviceId,
      },
    });

    return booking;
  });

  return result;
};

const getAllBookingsDB = async (userId: string) => {
  const result = await prisma.booking.findMany({
    where: {
      userId,
    },
  });

  return result;
};

const getBookingsDetailsByIdDB = async (bookingId: string, userId: string) => {
  const bookingDetails = await prisma.booking.findFirst({
    where: { id: bookingId },
  });

  if (!bookingDetails) {
    throw new Error("Booking not found");
  }

  if (userId !== bookingDetails.userId) {
    throw new Error("Invalid booking access ");
  }

  return bookingDetails;
};

const getAllBookingsByAdmin = async () => {
  const bookings = await prisma.booking.findMany();

  return bookings;
};

export const bookingService = {
  createBookingDB,
  getAllBookingsDB,
  getBookingsDetailsByIdDB,
  getAllBookingsByAdmin,
};
