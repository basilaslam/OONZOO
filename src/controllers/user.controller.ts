import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'
import { asyncHandler } from "../utils/asyncHandler";
import User, { IUser } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { UserRolesEnum } from "../types/user.types";
import { ApiResponse } from "../utils/ApiRespose";
import * as jwt from 'jsonwebtoken'
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {email, username, password, role } = req.body;

    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
      });
    
      if (existedUser) {
        throw new ApiError(409, "User with email or username already exists", []);
      }

        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword)
     
      
      const user = await User.create({
        email,
        password: hashedPassword,
        username,
        isEmailVerified: false,
        role: role || UserRolesEnum.USER,
      });


      const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
      );
    
      if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
      }
    
      return res
        .status(201)
        .json(
          new ApiResponse(
            200,
            { user: createdUser },
            "Users registered successfully and verification email has been sent on your email."
          )
        );
        
})


const loginUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {email, username, password} = req.body

    if(!username && !email){
        throw new ApiError(400, "Username or email is required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (!user) {
        throw new ApiError(404, "User does not exist");
      }
    
      // Compare the incoming password with hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password)
    
      if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
      }


      const { accessToken, refreshToken } =  generateAccessAndRefreshTokens(user);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options) 
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
    
})



function generateAccessAndRefreshTokens(user: IUser){
    
    try{

        const  accessToken  =  generateAccessToken(user)
        const  refreshToken  =  generateRefreshToken(user)
        
        return { accessToken, refreshToken }
    }catch (error) {
        throw new ApiError(
          500,
          "Something went wrong while generating the access token"
        );
    }
}

    export {registerUser, loginUser}