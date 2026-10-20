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

 

router.get(
  "/:Id",
  auth(Role.ADMIN, Role.CUSTOMER),
  bookingController.getBookingsDetailsById,
);




export const bookingRouter = router;
