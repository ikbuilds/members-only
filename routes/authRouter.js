import { Router } from "express";
import { login, signup, logout } from "../controller/authController.js";
import { loginValidator, signupValidator } from "../middleware/validators.js";

const authRouter = Router();

authRouter.post("/signup", signupValidator, signup);
authRouter.post("/login", loginValidator, login);

authRouter.get("/logout", logout);

export default authRouter;
