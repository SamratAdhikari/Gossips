import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protect.route.js";

const router = express.Router();

// *POST: send message
router.post("/send/:id", protectRoute, sendMessage);

// *GET: get messages
router.get("/:id", protectRoute, getMessages);

export default router;
