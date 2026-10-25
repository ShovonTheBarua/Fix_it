import type { NextFunction, Request, Response } from "express";
import { technicianService } from "./technician.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";

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

const createAvailabilitySlot = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await technicianService.createAvailabilitySlotDB(
      payload,
      req.user?.id as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "availability slot created",
      data: result,
    });
  },
);

const updateAvailabilitySlot = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slotId } = req.params;
    const payload = req.body;

    const result = await technicianService.updateAvailabilitySlot(
      payload,
      req.user?.id as string,
      slotId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "availability slot created",
      data: result,
    });
  },
);

const updateBookingStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params?.id as string;
    const result = await technicianService.updateBookingStatusDB(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "booking status updated",
      data: result,
    });
  },
);

const getAllTechnicianBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await technicianService.getAllTechnicianBookingsDB(
      req.user?.id as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "all technician bookings retrieved",
      data: result,
    });
  },
);

export const technicianController = {
  createTechnicianProfile,
  updateTechnicianProfile,
  createAvailabilitySlot,
  updateAvailabilitySlot,
  updateBookingStatus,
  getAllTechnicianBookings,
};
