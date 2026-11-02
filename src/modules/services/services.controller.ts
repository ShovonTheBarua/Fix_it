import type { NextFunction, Request, Response } from "express";
import { servicesService } from "./services.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
const createServices = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await servicesService.createServices(
    req.body,
    req.user?.id as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "service created successfully",
    data: result,
  });
};

const getAllService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    const result = await servicesService.getAllServiceDB(query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "all service retrieved successfully",
      data: result,
    });
  },
);
export const servicesController = {
  createServices,
  getAllService,
};
