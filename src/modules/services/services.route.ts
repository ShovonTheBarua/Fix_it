import { Router } from "express";
import { servicesController } from "./services.controller";

const router = Router();

router.post("/", servicesController.createServices);

export const servicesRouter = router;
