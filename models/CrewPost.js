import mongoose from "mongoose";

const crewPostSchema = new mongoose.Schema(
  {
    crewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Crew",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    text: { type: String, default: "" },
    photo: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("CrewPost", crewPostSchema);
