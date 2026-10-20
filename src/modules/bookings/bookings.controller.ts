import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await bookingService.createBookingDB(
      req.body,
      req.user?.id as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "booking created successfully",
      data: result,
    });
  },
);

const getAllBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await bookingService.getAllBookingsDB(
      req.user?.id as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "booking retrieved successfully",
      data: result,
    });
  },
);

const getBookingsDetailsById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params.Id;

    const result = await bookingService.getBookingsDetailsByIdDB(
      params as string,
      req.user?.id as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "booking details retrieved successfully",
      data: result,
    });
  },
);

const getAllBookingsByAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await bookingService.getAllBookingsByAdmin();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "all booking retrieved successfully",
      data: result,
    });
  },
);

export const bookingController = {
  getAllBookings,
  createBooking,
  getBookingsDetailsById,
  getAllBookingsByAdmin
};
