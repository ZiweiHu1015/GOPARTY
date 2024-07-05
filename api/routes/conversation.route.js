import express from "express";
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversationIsRead,
} from "../controllers/conversation.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getSingleConversation);
router.put("/isRead/:id", verifyToken, updateConversationIsRead);
// router.put("/lastMessage:id", verifyToken, updateConversationLastMessage);

export default router;
