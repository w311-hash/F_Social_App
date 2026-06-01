import express from "express";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Follow a user
router.post("/follow/:id", protect, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent duplicate follows
    if (targetUser.followers.includes(req.user._id)) {
      return res.status(400).json({ message: "Already following this user" });
    }

    targetUser.followers.push(req.user._id);
    currentUser.following.push(req.params.id);

    await targetUser.save();
    await currentUser.save();

    res.json({ message: "Followed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error following user", error });
  }
});

// Unfollow a user
router.post("/unfollow/:id", protect, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    targetUser.followers = targetUser.followers.filter(
      (f) => f.toString() !== req.user._id.toString()
    );

    currentUser.following = currentUser.following.filter(
      (f) => f.toString() !== req.params.id.toString()
    );

    await targetUser.save();
    await currentUser.save();

    res.json({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unfollowing user", error });
  }
});

// Get followers
router.get("/followers/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("followers", "name username profilePic");
    res.json(user.followers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching followers", error });
  }
});

// Get following
router.get("/following/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("following", "name username profilePic");
    res.json(user.following);
  } catch (error) {
    res.status(500).json({ message: "Error fetching following", error });
  }
});

export default router;
