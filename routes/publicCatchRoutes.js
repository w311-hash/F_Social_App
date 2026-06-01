import express from "express";
import Catch from "../models/Catch.js";

const router = express.Router();

// Public: Get all catches for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const catches = await Catch.find({ user: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(catches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching catches", error });
  }
});

export default router;
