import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import  protect  from "../middleware/authMiddleware.js";
import Profile from "../models/Profile.js";

const router = express.Router();

router.post("/avatar", protect, upload.single("avatar"), async (req, res) => {
  try {
    const imageUrl = req.file.path;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user },
      { avatar: imageUrl },
      { new: true, upsert: true }
    );

    res.json({ message: "Avatar updated", avatar: imageUrl, profile });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
});

export default router;
