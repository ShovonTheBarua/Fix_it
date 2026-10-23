import cookieParser from "cookie-parser";
import type { Application, NextFunction, Request, Response } from "express";
import express from "express";
import config from "./config";
import cors from "cors";
import { prisma } from "./lib/prisma";
import { userRouter } from "./modules/users/user.route";
import { authRoutes } from "./modules/auth/auth.route";
import { technicianRouter } from "./modules/technician/technician.route";
import { servicesRouter } from "./modules/services/services.route";
import { categoriesRouter } from "./modules/categories/categories.route";
import { bookingRouter } from "./modules/bookings/bookings.route";
import { adminRouter } from "./modules/admin/admin.route";
import { notFound } from "./middleware/notFound";
import httpStatus from "http-status";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { paymentRoutes } from "./modules/payment/payment.route";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  const user = await prisma.user.findMany();
  console.log(user);
  res.send("Hello, world");
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRoutes);
app.use("/api/technician", technicianRouter);
app.use("/api/services", servicesRouter);
app.use("/api/bookings", bookingRouter);

app.use("/api/admin/categories", categoriesRouter);
app.use("/api/admin", adminRouter);
app.use("/api/payment", paymentRoutes);

// error handling function
app.use(globalErrorHandler);

app.use(notFound);
export default app;
