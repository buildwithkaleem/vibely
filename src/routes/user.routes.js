import express from "express";
import protect from "../middleware/protect.js";
import { me } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", protect, me);

export default router;