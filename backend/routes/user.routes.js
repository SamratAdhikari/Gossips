import express from "express";
import protectRoute from "../middleware/protect.route.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

// *GET: users for sidebar
router.get("/", protectRoute, getUsersForSidebar);

export default router;
