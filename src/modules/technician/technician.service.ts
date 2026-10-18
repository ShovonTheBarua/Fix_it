import { prisma } from "../../lib/prisma";
import type { TechnicianPayload } from "./technician.interface";

const createTechnicianProfileDB = async (
  payload: TechnicianPayload,
  userId: string,
) => {
  const { skills, pricing, availability, experience } = payload;

  const isTechnicianExist = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
  });

  const technician = await prisma.technicianProfile.create({
    data: {
      userId,
      skills,
      pricing,
      availability,
      experience,
    },
  });

  return technician;
};

const updateTechnicianProfileDB = async (
  payload: TechnicianPayload,
  userId: string,
) => {
  const { skills, pricing, availability, experience } = payload;
  console.log(userId, payload);

  const result = await prisma.technicianProfile.update({
    where: { userId },
    data: {
      skills,
      pricing,
      availability,
      experience,
    },
  });

  return result;
};

export const technicianService = {
  createTechnicianProfileDB,
  updateTechnicianProfileDB,
};
