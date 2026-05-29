import express from "express";
import { createMembership } from "../controller/fitnessController.js";

const router = express.Router();

router.post("/", createMembership);

export default router;
