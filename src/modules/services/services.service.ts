import { equal } from "node:assert";
import { prisma } from "../../lib/prisma";
import type { IPostQuery, services } from "./services.interface";
import type { Prisma } from "../../../generated/prisma/client";
 
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

// public
const getAllServiceDB = async (query: IPostQuery) => {
  const { category, minPrice, maxPrice, search } = query;
  const whereConditions: Prisma.ServiceWhereInput = {};

  if (maxPrice || minPrice) {
    whereConditions.price = {
      ...(maxPrice && { lte: Number(maxPrice) }),
      ...(minPrice && { gte: Number(minPrice) }),
    };
  }

  if (category) {
    whereConditions.category = {
      is: { name: category },
    };
  }

  if (search) {
    whereConditions.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  const service = await prisma.service.findMany({
    where: whereConditions,
    orderBy: {
      createdAt: "desc",
    },

    include: {
      category: true,
      technician: true,
    },
  });
  return service;
};

export const servicesService = {
  createServices,
  getAllServiceDB,
};
