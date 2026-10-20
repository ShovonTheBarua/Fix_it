import { Router } from "express";
import { userController } from "../users/user.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { bookingController } from "../bookings/bookings.controller";

const router = Router();

router.patch("/users/:id", auth(Role.ADMIN), userController.updateUserStatus);

router.get("/users", auth(Role.ADMIN), userController.getAllUser);

router.get(
  "/bookings",
  auth(Role.ADMIN),
  bookingController.getAllBookingsByAdmin,
);

export const adminRouter = router;
