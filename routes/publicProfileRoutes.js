import express from "express";
import { getPublicProfile } from "../controllers/publicProfileController.js";

const router = express.Router();

// Public route — no auth needed
router.get("/:id", getPublicProfile);

export default router;
