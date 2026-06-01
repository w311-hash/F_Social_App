import express from "express";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Get notifications
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("notifications.fromUser", "username profilePic")
      .populate("notifications.catchId", "species photo");

    res.json(user.notifications.reverse()); // newest first
  } catch (error) {
    res.status(500).json({ message: "Error loading notifications", error });
  }
});

// Mark all as read
router.post("/read-all", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.notifications.forEach((n) => (n.isRead = true));
    await user.save();

    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Error updating notifications", error });
  }
});

export default router;
