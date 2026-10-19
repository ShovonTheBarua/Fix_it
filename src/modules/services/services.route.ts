import { Router } from "express";
import { servicesController } from "./services.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  auth(Role.ADMIN, Role.TECHNICIAN),
  servicesController.createServices,
);

export const servicesRouter = router;
