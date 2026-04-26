import express from "express";
import { adminLogin } from "../controllers/AuthController.js";

const router = express.Router();
router.post("/login", adminLogin);

export default router;
