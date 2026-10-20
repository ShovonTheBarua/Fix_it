import { Router } from "express";
import { bookingController } from "./bookings.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";

const router = Router();

router.post(
  "/",
  auth(Role.ADMIN, Role.CUSTOMER),
  bookingController.createBooking,
);

router.get(
  "/",
  auth(Role.ADMIN, Role.CUSTOMER),
  bookingController.getAllBookings,
);
export const bookingRouter = router;
