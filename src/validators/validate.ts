import { NextFunction, Request, Response } from "express";
import { FieldValidationError, validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError";

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const validationErrors = validationResult(req).array() as FieldValidationError[]
    if(!validationErrors.length){
        return next()
    }
    const errors: { [key: string]: any; }[] = []
     validationErrors.map((err) => errors.push({[err.path]:err.msg}))
    const error = new ApiError(422, "Received data is not valid", errors)
    console.log(error);
    
    throw new ApiError(422, "Received data is not valid", errors)
};
