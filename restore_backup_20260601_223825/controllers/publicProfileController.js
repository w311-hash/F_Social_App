import Profile from "../models/Profile.js";

export const getPublicProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id }).populate(
      "user",
      "username email"
    );

    if (!profile) {
      return res.status(404).json({ message: "Public profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching public profile", error });
  }
};
