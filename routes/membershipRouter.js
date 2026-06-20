import { Router } from "express";
import {
  membershipForm,
  makeMember,
} from "../controller/membershipController.js";
import { requireAuth } from "../middleware/auth.js";
import { membershipCodeValidator } from "../middleware/validators.js";

const membershipRouter = Router();

membershipRouter.use(requireAuth);

membershipRouter.get("/join", membershipForm);
membershipRouter.post("/join", membershipCodeValidator, makeMember);

export default membershipRouter;