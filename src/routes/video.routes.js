import express from "express";
import protect from "../middleware/protect.js";
import upload from "../config/multer.js";
import { uploadVideo } from "../controllers/video.controller.js";

const router = express.Router();

// router.post(
//   "/upload",
//   protect,
//   upload.single("video"),
//   (req, res) => {

//     res.json({
//       success: true,
//       file: req.file,
//     });

//   }
// );


router.post(
  "/upload",
  protect,
  upload.single("video"),
  uploadVideo
);

export default router;