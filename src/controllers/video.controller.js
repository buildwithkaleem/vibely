// import { uploadVideoToCloudinary } from "../services/cloudinary.service.js";

// export const uploadVideo = async (req, res) => {

//   if (!req.file) {
//     return res.status(400).json({
//       success: false,
//       message: "Video required"
//     });
//   }

//   const result = await uploadVideoToCloudinary(req.file.buffer);

//   return res.json({
//     success: true,
//     video: result.secure_url
//   });

// };


import { createTikTokDraft } from "../services/tiktok.upload.service.js";
import User from "../models/User.js";

export const uploadVideo = async (req, res) => {
  try {

    const { videoUrl } = req.body;

    if (!videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Video URL is required",
      });
    }

    const user = await User.findById(req.user._id);

    const result = await createTikTokDraft(
      user.accessToken,
      videoUrl
    );

    return res.json(result);

  } catch (error) {

    console.log(error.response?.data);

    return res.status(500).json(
      error.response?.data || {
        error: error.message,
      }
    );

  }
};

// export const uploadVideo = async (req, res) => {
//   try {
//     const { videoUrl, caption } = req.body;

//     if (!videoUrl) {
//       return res.status(400).json({
//         success: false,
//         message: "Video URL is required",
//       });
//     }

//     return res.json({
//       success: true,
//       videoUrl,
//       caption,
//       message: "Ready to send to TikTok",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };