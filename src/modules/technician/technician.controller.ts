import type { Request, Response } from "express";
import { technicianService } from "./technician.service";
import { sendResponse } from "../utils/sendResponse";
import httpStatus from "http-status";

const createTechnicianProfile = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  console.log("Userid", userId);
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
};

export const technicianController = { createTechnicianProfile };
