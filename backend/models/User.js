import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String, default: "" },

    // FOLLOWING SYSTEM
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],

    // NOTIFICATIONS
    notifications: [
      {
        type: {
          type: String, // "like", "comment", "follow"
          required: true
        },
        fromUser: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        catchId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Catch"
        },
        message: { type: String },
        isRead: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
      }
    ],

    // SPECIES STATS
    speciesStats: {
      type: Map,
      of: Number,
      default: {}
    },

    // BADGES
    badges: [
      {
        name: String,
        icon: String, // optional
        earnedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);




