import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import freeTrainingRoutes from "./routes/freeTrainingRoute.js";
import membershipRoutes from "./routes/membershipRoute.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/free-training", freeTrainingRoutes);
app.use("/api/memberships", membershipRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "Маршрут не знайдено" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Щось пішло не так!" });
});

export default app;
