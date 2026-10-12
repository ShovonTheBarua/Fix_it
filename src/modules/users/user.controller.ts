import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpStatus from "http-status";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await userService.registerUserIntoDB(payload);
  // console.log(name);
  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "user registered successfully",
    data: {
      result,
    },
  });
}

export const userController ={
    createUser
}