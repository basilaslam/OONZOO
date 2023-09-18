import { Router } from "express";
import { userLoginValidator, userRegisterValidator } from "../validators/auth/auth.validator";
import { validate } from "../validators/validate";
import { loginUser, registerUser } from "../controllers/user.controller";

const router:Router = Router()

router.route("/signup").post(userRegisterValidator(), validate, registerUser)
router.route("/login").post(userLoginValidator(), validate, loginUser)

export default router;