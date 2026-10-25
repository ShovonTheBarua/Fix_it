import { prisma } from "../../lib/prisma";
import type { Slot, TechnicianPayload } from "./technician.interface";

const createTechnicianProfileDB = async (
  payload: TechnicianPayload,
  userId: string,
) => {
  const { skills, pricing, experience } = payload;

  const isTechnicianExist = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
  });

  const technician = await prisma.technicianProfile.create({
    data: {
      userId,
      skills,
      pricing,
      experience,
    },
  });

  return technician;
};

const updateTechnicianProfileDB = async (
  payload: TechnicianPayload,
  userId: string,
) => {
  const { skills, pricing, experience } = payload;
  console.log(userId, payload);

  const result = await prisma.technicianProfile.update({
    where: { userId },
    data: {
      skills,
      pricing,
      experience,
    },
  });

  return result;
};

const createAvailabilitySlotDB = async (payload: Slot, userId: string) => {
  const { date, startTime, endTime } = payload;

  const technicianProf = await prisma.technicianProfile.findUnique({
    where: { userId },
  });

  if (!technicianProf) {
    throw new Error("you don't have technician profile");
  }

  const technicianId = technicianProf.id;

  const result = await prisma.technicianAvailability.create({
    data: {
      technicianId,
      date,
      startTime,
      endTime,
    },
  });

  return result;
};

const updateAvailabilitySlot = async (
  payload: Slot,
  userId: string,
  slotId: string,
) => {
  const technicianProf = await prisma.technicianProfile.findUnique({
    where: { userId },
  });

  if (!technicianProf) {
    throw new Error("you don't have technician profile");
  }
  const technicianId = technicianProf.id;

  const existingSlot = await prisma.technicianAvailability.findFirst({
    where: {
      id: slotId,
      technicianId,
    },
  });

  if (!existingSlot) {
    throw new Error("Availability slot not found");
  }

  const result = await prisma.technicianAvailability.update({
    where: {
      id: slotId,
    },
    data: payload,
  });

  return result;
};

const updateBookingStatusDB = async (id: string) => {
  const result = await prisma.booking.update({
    where: { id },
    data: {
      status: "ACCEPTED",
    },
  });
  return result;
};

const getAllTechnicianBookingsDB = async (userId: string) => {
  const technician = await prisma.technicianProfile.findUnique({
    where: { userId },
  });

  if (!technician) {
    throw new Error(
      "technician profile doesn't exits. Create a technician profile first",
    );
  }
  const technicianId = technician.id;

  const result = await prisma.booking.findMany({
    where: { technicianId },
  });

  return result;
};

export const technicianService = {
  createTechnicianProfileDB,
  updateTechnicianProfileDB,
  createAvailabilitySlotDB,
  updateAvailabilitySlot,
  updateBookingStatusDB,
  getAllTechnicianBookingsDB,
};
