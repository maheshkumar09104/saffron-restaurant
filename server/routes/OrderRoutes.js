import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { placeOrder, getAllOrders, updateOrderStatus, verifyDeliveryOTP } from "../controllers/orderController.js";

const router = express.Router();

router.post("/",                  placeOrder);
router.get("/",           protect, getAllOrders);
router.put("/:id/status", protect, updateOrderStatus);
router.post("/:id/verify-otp", protect, verifyDeliveryOTP);

export default router;