import { Router } from "express";
import { paymentController } from "./payment.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";

const router = Router();

router.post(
  "/checkout",
  auth(Role.CUSTOMER, Role.ADMIN),
  paymentController.createCheckoutSession,
);

router.post("/webhook", paymentController.handleWebhook);
router.get(
  "/",
  auth(Role.CUSTOMER, Role.ADMIN),
  paymentController.getAllUsersPayment,
);

router.get(
  "/:id",
  auth(Role.CUSTOMER, Role.ADMIN),
  paymentController.getPaymentById,
);

export const paymentRoutes = router;
