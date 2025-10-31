import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { app, server } from "./lib/socket.js";
import path from "path";

// Load .env variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// ✅ Middleware
app.use(express.json({ limit: "5mb" })); // increase payload limit
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

// ✅ CORS setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Preflight request support
app.options("*", cors());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// ✅ Connect DB and start server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("✅ Server is running on Port:", PORT);
  });
});
