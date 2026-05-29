import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import dbRunner from "./bin/runners/db.js";

// Роути для фітнесу
import FreeTrainingRoute from "./routes/freeTrainingRoute.js";
import MembershipRoute from "./routes/membershipRoute.js";

dotenv.config();
dbRunner();

console.log(
  "🔍 MONGODB_URI:",
  process.env.MONGODB_URI ? "✅ Отримано" : "❌ НІ",
);
console.log("🔍 PORT:", process.env.PORT);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS (додай свій фронтенд URL)
app.use(
  cors({
    origin: ["http://localhost:5173", "https://fitpower-frontend.onrender.com"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// Роути
app.use("/api/free-training", FreeTrainingRoute);
app.use("/api/memberships", MembershipRoute);

// Health check для Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "Маршрут не знайдено" });
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("❌ Помилка:", err.stack);
  res.status(500).json({
    success: false,
    message: "Щось пішло не так!",
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 FitPower server running on ${PORT}`);
});

export default app;
