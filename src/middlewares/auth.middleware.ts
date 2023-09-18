import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

interface CustomRequest extends Request {
  user?: IUser; // Define the user property with IUser type
}

export const verifyJWT = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    console.log(token);
    
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    if (!accessTokenSecret) {
      throw new Error(
        'ACCESS_TOKEN_SECRET is not defined in the environment variables'
      );
    }

    try {
      const decodedToken = jwt.verify(
        token,
        accessTokenSecret
      ) as JwtPayload | undefined;

      if (!decodedToken || !decodedToken._id) {
        throw new ApiError(401, "Invalid access token");
      }

      const user = await User.findById(decodedToken._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
      );

      if (!user) {
        throw new ApiError(401, "Invalid access token");
      }

      req.user = user as IUser;
      next();
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Invalid access token";
        throw new ApiError(401, errorMessage);
    }
  }
);
