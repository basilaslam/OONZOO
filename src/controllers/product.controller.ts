import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import ProductModel, { Product } from "../models/product.model";

export const getProducts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const page: number = parseInt(req.query.page as string) || 1; // Current page number, default is 1
    const perPage: number = parseInt(req.query.perPage as string) || 10; // Number of items per page, default is 10

    try {
        const totalProducts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalProducts / perPage);

        const products: Product[] = await ProductModel.find()
            .skip((page - 1) * perPage)
            .limit(perPage);

        res.json({
            products,
            page,
            totalPages,
            totalProducts,
        });
    } catch (error) {
        next(error);
    }
});


