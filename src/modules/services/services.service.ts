import { prisma } from "../../lib/prisma";
import type { services } from "./services.interface";

const createServices = async (payload: services, userId: string) => {
  const technician = await prisma.technicianProfile.findUniqueOrThrow({
    where: { userId },
  });

  const service = await prisma.service.create({
    data: {
      ...payload,
      technicianId: technician.id,
    },
  });

  return service;
};

export const servicesService = {
  createServices,
};
