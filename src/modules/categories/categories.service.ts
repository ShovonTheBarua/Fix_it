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

export const categoriesService = {
  createCategoriesDB,
};
