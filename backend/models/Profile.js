import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    avatar: { type: String, default: "" }, // Cloudinary URL later
    speciesCaught: { type: [String], default: [] },
    totalCatches: { type: Number, default: 0 },
    biggestCatch: { type: String, default: "" },
    favoriteTechnique: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
