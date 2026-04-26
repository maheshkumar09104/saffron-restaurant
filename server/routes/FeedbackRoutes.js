import express from "express";
import { submitFeedback, getAllFeedback, markAsRead } from "../controllers/FeedbackController.js";
import { protect } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/",          submitFeedback);
router.get("/",    protect, getAllFeedback);
router.put("/:id", protect, markAsRead);

export default router;
