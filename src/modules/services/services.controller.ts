import type { NextFunction, Request, Response } from "express";
import { servicesService } from "./services.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
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

export const servicesController = {
  createServices,
};
