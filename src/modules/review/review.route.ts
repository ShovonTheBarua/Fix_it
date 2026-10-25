import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { reviewController } from "./reviewController";

const router = Router();

router.post("/", auth(Role.CUSTOMER), reviewController.createReview);

export const reviewRouter = router;
