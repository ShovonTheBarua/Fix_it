import { Router } from "express";
import { technicianController } from "./technician.controller";
import { auth } from "../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/profile",
  auth(Role.ADMIN, Role.TECHNICIAN),
  technicianController.createTechnicianProfile,
);
router.put(
  "/profile",
  auth(Role.ADMIN, Role.TECHNICIAN),
  technicianController.updateTechnicianProfile,
);

export const technicianRouter = router;
