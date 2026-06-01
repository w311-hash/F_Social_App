import dotenv from "dotenv";
dotenv.config();
import express from "express";

import cors from "cors";
import connectDB from "./config/db.js";
import find from "find-process";
import { exec } from "child_process";
import http from "http";
import { Server } from "socket.io";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import catchRoutes from "./routes/catchRoutes.js";
import publicProfileRoutes from "./routes/publicProfileRoutes.js";
import publicCatchRoutes from "./routes/publicCatchRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import feedRoutes from "./routes/feedRoutes.js";
import interactionRoutes from "./routes/interactionRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import crewRoutes from "./routes/crewRoutes.js";
import crewFeedRoutes from "./routes/crewFeedRoutes.js";
import crewRoleRoutes from "./routes/crewRoleRoutes.js";
import speciesStatsRoutes from "./routes/speciesStatsRoutes.js";



// Connect to MongoDB
connectDB();

const app = express();

// -----------------------------
// ⭐ FIXED CORS CONFIG
// -----------------------------
app.use(cors({
  origin: [
    "https://anglerscentral2026.web.app",              // Firebase frontend
    "https://anglerscentral-social-app.onrender.com",  // Render backend
    "http://localhost:5000",
    "http://127.0.0.1:5000",
    "http://10.0.2.2:5000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Body parser
app.use(express.json({ limit: "10mb" }));

// -----------------------------
// ⭐ ROUTES
// -----------------------------

// Public Routes
app.use("/api/auth", authRoutes);
app.use("/api/public-profile", publicProfileRoutes);

// Protected Routes
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/catches", catchRoutes);
app.use("/api/public-catches", publicCatchRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/interactions", interactionRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/crews", crewRoutes);
app.use("/api/crew-feed", crewFeedRoutes);
app.use("/api/crew-roles", crewRoleRoutes);
app.use("/api/species-stats", speciesStatsRoutes);

// Root Test Route
app.get("/", (req, res) => {
  res.send("ANGLERS CENTRAL API is running...");
});

// -----------------------------
// ⭐ SOCKET.IO WITH FIXED CORS
// -----------------------------
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://anglerscentral2026.web.app",
      "https://anglerscentral-social-app.onrender.com",
      "http://localhost:5000",
      "http://127.0.0.1:5000",
      "http://10.0.2.2:5000"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Store connected users: userId -> socketId
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id);

  socket.on("register", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`✅ User ${userId} registered on socket ${socket.id}`);
  });

  socket.on("disconnect", () => {
    for (const [userId, sId] of onlineUsers.entries()) {
      if (sId === socket.id) {
        onlineUsers.delete(userId);
        console.log(`❌ User ${userId} disconnected`);
        break;
      }
    }
  });
});

// Helper to emit notification to a specific user
export const sendRealtimeNotification = (userId, payload) => {
  const socketId = onlineUsers.get(userId.toString());
  if (socketId) {
    io.to(socketId).emit("notification", payload);
  }
};

// -----------------------------
// ⭐ AUTO‑PORT‑RESET + SERVER START
// -----------------------------
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    const list = await find("port", PORT);

    if (list.length > 0) {
      console.log(`⚠️  Port ${PORT} is busy. Killing process ${list[0].pid}...`);

      exec(`taskkill /PID ${list[0].pid} /F`, (err) => {
        if (err) {
          console.error("❌ Failed to free port:", err);
        } else {
          console.log(`✅ Port ${PORT} freed successfully.`);
        }
        launch();
      });
    } else {
      launch();
    }
  } catch (error) {
    console.error("Error checking port:", error);
    launch();
  }
}

function launch() {
  server.listen(PORT, () =>
    console.log(`🚀 ANGLERS CENTRAL backend running on port ${PORT}`)
  );
}

startServer();