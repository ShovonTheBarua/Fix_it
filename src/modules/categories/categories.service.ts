import { prisma } from "../../lib/prisma";
import type { categoriesPayload } from "./categories.interface";

const createCategoriesDB = async (payload: categoriesPayload) => {
  const { name, description } = payload;

  const result = await prisma.category.create({
    data: {
      name,
      description,
    },
  });

  return result;
};

const getAllCategoriesDB = async () => {
  const result = await prisma.category.findMany();

  return result;
};

export const categoriesService = {
  createCategoriesDB,
  getAllCategoriesDB,
};
