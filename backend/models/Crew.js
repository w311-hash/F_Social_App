import mongoose from "mongoose";

const crewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },

    // Captain (owner)
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Members
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    // Roles
    roles: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["captain", "co-captain", "member"],
          default: "member"
        }
      }
    ],

    photo: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Crew", crewSchema);
