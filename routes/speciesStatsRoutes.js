import express from "express";
import protect from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/:userId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      speciesStats: Object.fromEntries(user.speciesStats),
      badges: user.badges
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error });
  }
});

export default router;
