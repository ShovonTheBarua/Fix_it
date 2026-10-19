import { Router } from "express";
import { auth } from "../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { categoriesController } from "./categories.controller";

const router = Router();

router.post("/", auth(Role.ADMIN), categoriesController.createCategories);

export const categoriesRouter = router;
