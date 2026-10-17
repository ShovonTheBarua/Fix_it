import { prisma } from "../../lib/prisma";
import type { technicianPayload } from "./technician.interface";

const createTechnicianProfileDB = async (payload: technicianPayload, userId: string) => {
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

  return technician
};

export const technicianService = {
  createTechnicianProfileDB,
};
