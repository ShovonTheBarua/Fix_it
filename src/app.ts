import cookieParser from "cookie-parser";
import type { Application, Request, Response } from "express";
import express from "express";
import config from "./config";
import cors from "cors";
import { prisma } from "./lib/prisma";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";

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

app.post("/api/users/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });
  if (isUserExist) {
    throw new Error("user with this email already exist");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_round),
  );

  const user = await prisma.user.create({
    data: {
      name : name,
      email : email,
      password : hashedPassword,
    },
  });

  console.log(name);
  res.status(httpStatus.CREATED).json({ message: "user registered" });
});

export default app;
