import express from "express";
import User from "../models/User.js";
import Catch from "../models/Catch.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Get feed from followed anglers
router.get("/", protect, async (req, res) => {
  try {
    // Get the logged-in user
    const user = await User.findById(req.user._id);

    // Get list of user IDs they follow
    const followingList = user.following;

    // Fetch catches from followed users
    const feed = await Catch.find({ user: { $in: followingList } })
      .populate("user", "username photo")
      .sort({ createdAt: -1 });

    res.json(feed);
  } catch (error) {
    res.status(500).json({ message: "Error loading feed", error });
  }
});

export default router;
