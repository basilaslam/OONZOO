import mongoose from "mongoose";
import { ApiError, ApiErrorInterface } from "../utils/ApiError";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";


const errorHandler = (err: ApiErrorInterface, req: Request, res: Response, next: NextFunction) => {
  let error = err;

  // if the error is not an instance of ApiError
  if (!(error instanceof ApiError)) {
   
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;

    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  // Now if the `error` variable will be an instance of ApiError class we'll return the error

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {})
  };

  return res.status(error.statusCode).json(response);
};

export { errorHandler };
