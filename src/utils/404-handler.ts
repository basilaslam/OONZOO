import { Request, Response } from "express";

export const handle404 = (req: Request, res: Response) => {
    res.status(404).json({ message: "Not Found" });
};