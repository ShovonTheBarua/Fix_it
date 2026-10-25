import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { paymentServices } from "./payment.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createCheckoutSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookingId = req.body.bookingId;
    const result = await paymentServices.createCheckoutSession(bookingId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Checkout completed successfully",
      data: result,
    });
  },
);

const handleWebhook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const event = req.body as Buffer; // when express.raw so its a string
    const signature = req.headers["stripe-signature"]!;

    const result = await paymentServices.handleWebhook(
      event,
      signature as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "webhook triggered successfully",
      data: null,
    });
  },
);

export const paymentController = {
  createCheckoutSession,
  handleWebhook,
};
