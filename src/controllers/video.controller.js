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


export const uploadVideo = async (req, res) => {
  try {
    const { videoUrl, caption } = req.body;

    if (!videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Video URL is required",
      });
    }

    return res.json({
      success: true,
      videoUrl,
      caption,
      message: "Ready to send to TikTok",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};