import { Router, type Request, type Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import { userController } from "./user.controller";


const router = Router();

router.post("/register",  userController.registerUser);

export const userRouter = router;
