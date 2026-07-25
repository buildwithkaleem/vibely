import { uploadVideoToCloudinary } from "../services/cloudinary.service.js";

export const uploadVideo = async (req, res) => {

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Video required"
    });
  }

  const result = await uploadVideoToCloudinary(req.file.buffer);

  return res.json({
    success: true,
    video: result.secure_url
  });

};