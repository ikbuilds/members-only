import { Router } from "express";
import {
  createMessage,
  deleteAllMessages,
  deleteMessage,
  getMessagesPage,
} from "../controller/messagesController.js";
import {
  searchValidator,
  deleteMessageValidator,
  createMessageValidator,
} from "../middleware/validators.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

const messagesRouter = Router();

messagesRouter.use(requireAuth);

messagesRouter.get("/", searchValidator, getMessagesPage);
messagesRouter.post("/new", createMessageValidator, createMessage);
messagesRouter.delete("/", requireAdmin, deleteAllMessages);
messagesRouter.delete(
  "/:id",
  requireAdmin,
  deleteMessageValidator,
  deleteMessage,
);

export default messagesRouter;
