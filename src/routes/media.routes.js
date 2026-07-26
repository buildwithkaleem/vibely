import express from "express";

import { streamVideo } from "../controllers/media.controller.js";

const router = express.Router();

router.get(

  "/video/:id",

  streamVideo

);

export default router;