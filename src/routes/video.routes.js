import express from "express";
import protect from "../middleware/protect.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("video"),
  (req, res) => {

    res.json({
      success: true,
      file: req.file,
    });

  }
);

export default router;