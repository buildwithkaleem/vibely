import express from "express";
import protect from "../middleware/protect.js";
// import upload from "../config/multer.js";
import {
  uploadVideo, 
  getVideos, 
  getVideo,
  updateVideo,
  deleteVideo } from "../controllers/video.controller.js";

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


// router.post(
//   "/publish",
//   protect,
//   upload.single("video"),
//   uploadVideo
// );


router.post(
  "/publish",
  protect,
  uploadVideo
);

router.get(
  "/",
  protect,
  getVideos
);


router.get(
  "/:id",
  protect,
  getVideo
);

router.put(
  "/:id",
  protect,
  updateVideo
);

router.delete(
  "/:id",
  protect,
  deleteVideo
);

export default router;