import { Router } from "express";
import { getLandingPage } from "../controller/indexController.js";

const indexRouter = Router();

indexRouter.get("/", getLandingPage);

export default indexRouter;
