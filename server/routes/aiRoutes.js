import express from "express";
import { ask } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";
import { aiRateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/ask", protect, aiRateLimiter, ask);

export default router;