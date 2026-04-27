import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import { getAllFoods, getFoodById, createFood, updateFood, deleteFood } from "../controllers/FoodController.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.get("/", getAllFoods);
router.get("/:id", getFoodById);
router.post("/", protect, upload.single("image"), createFood);
router.put("/:id", protect, upload.single("image"), updateFood);
router.delete("/:id", protect, deleteFood);

export default router;