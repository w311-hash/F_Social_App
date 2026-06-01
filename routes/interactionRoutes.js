import express from "express";
import Catch from "../models/Catch.js";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";
import { sendRealtimeNotification } from "../server.js";

const router = express.Router();

// -----------------------------------------
// LIKE a catch
// -----------------------------------------
router.post("/like/:catchId", protect, async (req, res) => {
  try {
    const catchItem = await Catch.findById(req.params.catchId);

    if (!catchItem) {
      return res.status(404).json({ message: "Catch not found" });
    }

    // Prevent duplicate likes
    if (catchItem.likes.includes(req.user._id)) {
      return res.status(400).json({ message: "Already liked" });
    }

    catchItem.likes.push(req.user._id);
    await catchItem.save();

    // Notify catch owner (if not liking own catch)
    if (catchItem.user.toString() !== req.user._id.toString()) {
      const owner = await User.findById(catchItem.user);

      // Save notification in DB
      owner.notifications.push({
        type: "like",
        fromUser: req.user._id,
        catchId: catchItem._id,
        message: "liked your catch"
      });
      await owner.save();

      // Real‑time push
      sendRealtimeNotification(owner._id, {
        type: "like",
        fromUser: req.user._id,
        catchId: catchItem._id,
        message: "liked your catch",
        createdAt: new Date()
      });
    }

    res.json({ message: "Catch liked" });
  } catch (error) {
    res.status(500).json({ message: "Error liking catch", error });
  }
});

// -----------------------------------------
// COMMENT on a catch
// -----------------------------------------
router.post("/comment/:catchId", protect, async (req, res) => {
  try {
    const catchItem = await Catch.findById(req.params.catchId);

    if (!catchItem) {
      return res.status(404).json({ message: "Catch not found" });
    }

    const comment = {
      user: req.user._id,
      text: req.body.text
    };

    catchItem.comments.push(comment);
    await catchItem.save();

    // Notify catch owner (if not commenting on own catch)
    if (catchItem.user.toString() !== req.user._id.toString()) {
      const owner = await User.findById(catchItem.user);

      // Save notification in DB
      owner.notifications.push({
        type: "comment",
        fromUser: req.user._id,
        catchId: catchItem._id,
        message: "commented on your catch"
      });
      await owner.save();

      // Real‑time push
      sendRealtimeNotification(owner._id, {
        type: "comment",
        fromUser: req.user._id,
        catchId: catchItem._id,
        message: "commented on your catch",
        createdAt: new Date()
      });
    }

    res.json({ message: "Comment added" });
  } catch (error) {
    res.status(500).json({ message: "Error commenting", error });
  }
});

export default router;
