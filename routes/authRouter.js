import { Router } from "express";
import {
  login,
  signup,
  logout,
  getSignup,
  getLogin,
} from "../controller/authController.js";
import { loginValidator, signupValidator } from "../middleware/validators.js";

const authRouter = Router();

authRouter.get("/signup", getSignup);
authRouter.post("/signup", signupValidator, signup);
authRouter.get("/login", getLogin);
authRouter.post("/login", login);

authRouter.get("/logout", logout);

export default authRouter;
