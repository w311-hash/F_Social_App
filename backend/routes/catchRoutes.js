import express from "express";
import  protect  from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { createCatch, getMyCatches } from "../controllers/catchController.js";

const router = express.Router();

router.post("/", protect, upload.single("photo"), createCatch);
router.get("/", protect, getMyCatches);

export default router;
