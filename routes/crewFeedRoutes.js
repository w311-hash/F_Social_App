import express from "express";
import protect from "../middleware/authMiddleware.js";
import Crew from "../models/Crew.js";
import CrewPost from "../models/CrewPost.js";

const router = express.Router();

// Create a crew post
router.post("/:crewId", protect, async (req, res) => {
  try {
    const crew = await Crew.findById(req.params.crewId);

    if (!crew) return res.status(404).json({ message: "Crew not found" });

    // Must be a member
    if (!crew.members.includes(req.user._id)) {
      return res.status(403).json({ message: "Not a crew member" });
    }

    const post = await CrewPost.create({
      crewId: crew._id,
      user: req.user._id,
      text: req.body.text || "",
      photo: req.body.photo || ""
    });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating crew post", error });
  }
});

// Get crew feed
router.get("/:crewId", protect, async (req, res) => {
  try {
    const crew = await Crew.findById(req.params.crewId);

    if (!crew) return res.status(404).json({ message: "Crew not found" });

    // Must be a member
    if (!crew.members.includes(req.user._id)) {
      return res.status(403).json({ message: "Not a crew member" });
    }

    const posts = await CrewPost.find({ crewId: crew._id })
      .populate("user", "name photo")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error loading crew feed", error });
  }
});

export default router;
