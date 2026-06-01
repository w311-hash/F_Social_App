import express from "express";
import protect from "../middleware/authMiddleware.js";
import Crew from "../models/Crew.js";
import User from "../models/User.js";
import { sendRealtimeNotification } from "../server.js";

const router = express.Router();

// -----------------------------
// CREATE CREW
// -----------------------------
router.post("/create", protect, async (req, res) => {
  try {
    const { name, description } = req.body;

    const crew = await Crew.create({
      name,
      description,
      captain: req.user._id,
      members: [req.user._id]
    });

    res.json(crew);
  } catch (error) {
    res.status(500).json({ message: "Error creating crew", error });
  }
});

// -----------------------------
// INVITE USER TO CREW
// -----------------------------
router.post("/invite/:crewId/:userId", protect, async (req, res) => {
  try {
    const crew = await Crew.findById(req.params.crewId);

    if (!crew) return res.status(404).json({ message: "Crew not found" });

    if (crew.captain.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only captain can invite" });
    }

    // Prevent duplicate invites
    if (crew.invites.some(i => i.user.toString() === req.params.userId)) {
      return res.status(400).json({ message: "Already invited" });
    }

    crew.invites.push({
      user: req.params.userId,
      invitedBy: req.user._id
    });

    await crew.save();

    // Real‑time notification
    sendRealtimeNotification(req.params.userId, {
      type: "crew_invite",
      crewId: crew._id,
      message: `You were invited to join crew: ${crew.name}`,
      createdAt: new Date()
    });

    res.json({ message: "User invited" });
  } catch (error) {
    res.status(500).json({ message: "Error inviting user", error });
  }
});

// -----------------------------
// ACCEPT INVITE
// -----------------------------
router.post("/accept/:crewId", protect, async (req, res) => {
  try {
    const crew = await Crew.findById(req.params.crewId);

    if (!crew) return res.status(404).json({ message: "Crew not found" });

    const invite = crew.invites.find(
      i => i.user.toString() === req.user._id.toString()
    );

    if (!invite) {
      return res.status(400).json({ message: "No invite found" });
    }

    // Add member
    crew.members.push(req.user._id);

    // Remove invite
    crew.invites = crew.invites.filter(
      i => i.user.toString() !== req.user._id.toString()
    );

    await crew.save();

    // Notify captain
    sendRealtimeNotification(crew.captain, {
      type: "crew_join",
      crewId: crew._id,
      message: `${req.user.name} joined your crew`,
      createdAt: new Date()
    });

    res.json({ message: "Joined crew" });
  } catch (error) {
    res.status(500).json({ message: "Error joining crew", error });
  }
});

// -----------------------------
// LEAVE CREW
// -----------------------------
router.post("/leave/:crewId", protect, async (req, res) => {
  try {
    const crew = await Crew.findById(req.params.crewId);

    if (!crew) return res.status(404).json({ message: "Crew not found" });

    // Captain cannot leave
    if (crew.captain.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "Captain cannot leave crew" });
    }

    crew.members = crew.members.filter(
      m => m.toString() !== req.user._id.toString()
    );

    await crew.save();

    res.json({ message: "Left crew" });
  } catch (error) {
    res.status(500).json({ message: "Error leaving crew", error });
  }
});

// -----------------------------
// GET CREW DETAILS
// -----------------------------
router.get("/:crewId", protect, async (req, res) => {
  try {
    const crew = await Crew.findById(req.params.crewId)
      .populate("captain", "name photo")
      .populate("members", "name photo")
      .populate("invites.user", "name photo");

    if (!crew) return res.status(404).json({ message: "Crew not found" });

    res.json(crew);
  } catch (error) {
    res.status(500).json({ message: "Error fetching crew", error });
  }
});

export default router;
