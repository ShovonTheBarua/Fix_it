import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import type { ILoginUser } from "./auth.interface";
import jwt, { type SignOptions } from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../utils/jwt";

const loginUserIntoDB = async (payload: ILoginUser) => {
  const { email, password } = payload;
  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("password not matched");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  console.log("JWT Secret Value:", config.jwt_access_secret);


  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const authService = {
  loginUserIntoDB,
};
