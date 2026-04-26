import express from "express";
import multer from "multer";
import { protect } from "../middleware/AuthMiddleware.js";
import { getAllFoods, getFoodById, createFood, updateFood, deleteFood } from "../controllers/FoodController.js";

const router = express.Router();

// Multer: save uploaded images into /uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/",    getAllFoods);            // public
router.get("/:id", getFoodById);           // public
router.post("/",   protect, upload.single("image"), createFood); // admin
router.put("/:id", protect, upload.single("image"), updateFood); // ← add upload.single
router.delete("/:id", protect, deleteFood);// admin

export default router;
