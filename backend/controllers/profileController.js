import Profile from "../models/Profile.js";

// GET logged-in user's profile
export const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// UPDATE logged-in user's profile
export const updateMyProfile = async (req, res) => {
  try {
    const updates = req.body;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user },
      updates,
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
