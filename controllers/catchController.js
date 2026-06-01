import Catch from "../models/Catch.js";

// Create a new catch
export const createCatch = async (req, res) => {
  try {
    const { species, weight, length, location, notes } = req.body;

    const newCatch = await Catch.create({
      user: req.user,
      species,
      weight,
      length,
      location,
      notes,
      photo: req.file ? req.file.path : ""
    });

    res.json(newCatch);
  } catch (error) {
    res.status(500).json({ message: "Error creating catch", error });
  }
};

// Get all catches for logged-in user
export const getMyCatches = async (req, res) => {
  try {
    const catches = await Catch.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(catches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching catches", error });
  }
};
