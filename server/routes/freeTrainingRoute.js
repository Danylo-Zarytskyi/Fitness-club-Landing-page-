import express from "express";
import { createFreeTraining } from "../controller/fitnessController.js";

const router = express.Router();

router.post("/", createFreeTraining);

export default router;
