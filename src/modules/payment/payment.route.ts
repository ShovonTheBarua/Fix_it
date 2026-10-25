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

export const paymentRoutes = router;
