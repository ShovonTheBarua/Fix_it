import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { categoriesService } from "./categories.service";
import { sendResponse } from "../utils/sendResponse";
import httpStatus from "http-status";
const createCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await categoriesService.createCategoriesDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "category created successfully",
      data: result,
    });
  },
);

export const categoriesController = {
  createCategories,
};
