import type { NextFunction, Request, Response } from "express";
import { technicianService } from "./technician.service";
import { sendResponse } from "../utils/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";

const createTechnicianProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const payload = req.body;
    const result = await technicianService.createTechnicianProfileDB(
      payload,
      userId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Technician profile created successfully",
      data: result,
    });
  },
);

const updateTechnicianProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    
    const payload = req.body;
    const result = await technicianService.updateTechnicianProfileDB(
      payload,
      req.user?.id as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "profile updated successfully",
      data: result,
    });
  },
);

export const technicianController = {
  createTechnicianProfile,
  updateTechnicianProfile,
};
