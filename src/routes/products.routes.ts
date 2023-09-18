import { Router } from "express";
import { getProducts } from "../controllers/product.controller";
import { verifyJWT } from "../middlewares/auth.middleware";


const router: Router = Router()

router.route("/").get(verifyJWT,getProducts)


export default router