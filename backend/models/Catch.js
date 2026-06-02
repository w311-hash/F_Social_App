import mongoose from "mongoose";

const catchSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    species: { type: String, required: true },
    weight: { type: Number, default: 0 },
    length: { type: Number, default: 0 },
    location: { type: String, default: "" },
    photo: { type: String, default: "" }, // Cloudinary URL
    notes: { type: String, default: "" },

    // 👍 LIKES
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    // 💬 COMMENTS
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Catch", catchSchema);
