import express from "express";
import protect from "../middleware/authMiddleware.js";
import Crew from "../models/Crew.js";

const router = express.Router();

// Promote to co-captain
router.post("/promote/:crewId/:userId", protect, async (req, res) => {
  try {
    const crew = await Crew.findById(req.params.crewId);

    if (!crew) return res.status(404).json({ message: "Crew not found" });

    // Only captain can promote
    if (crew.captain.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only captain can promote" });
    }

    // Add role
    crew.roles.push({
      user: req.params.userId,
      role: "co-captain"
    });

    await crew.save();

    res.json({ message: "User promoted to co-captain" });
  } catch (error) {
    res.status(500).json({ message: "Error promoting user", error });
  }
});

// Demote co-captain back to member
router.post("/demote/:crewId/:userId", protect, async (req, res) => {
  try {
    const crew = await Crew.findById(req.params.crewId);

    if (!crew) return res.status(404).json({ message: "Crew not found" });

    if (crew.captain.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only captain can demote" });
    }

    crew.roles = crew.roles.filter(
      (r) => r.user.toString() !== req.params.userId.toString()
    );

    await crew.save();

    res.json({ message: "User demoted" });
  } catch (error) {
    res.status(500).json({ message: "Error demoting user", error });
  }
});

export default router;
