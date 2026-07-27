import User from "../models/User.js";
import Video from "../models/Video.js";
import { createTikTokDraft } from "../services/tiktok.upload.service.js";

export const uploadVideo = async (req, res) => {
  try {
    const { videoUrl, caption } = req.body;

    if (!videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Video URL is required",
      });
    }

    // Logged in user
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Save video in database
    const video = await Video.create({
      user: user._id,
      cloudinaryUrl: videoUrl,
      caption: caption || "",
    });

    let tiktokResult = null;

    try {
      tiktokResult = await createTikTokDraft(
        user.accessToken,
        `https://vibely-api.egrif.online/api/media/video/${video._id}`
      );
    } catch (err) {

      return res.status(500).json({
        success: false,
        error: err.response?.data || err.message
      });

    }

    return res.json({
      success: true,
      message: "Video saved successfully",
      video,
      tiktok: tiktokResult,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all videos of logged-in user
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      videos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get singal videos of logged-in user
export const getVideo = async (req, res) => {
  try {

    const video = await Video.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    return res.json({
      success: true,
      video,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// update video caption
export const updateVideo = async (req, res) => {

  try {

    const { caption } = req.body;

    const video = await Video.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!video) {

      return res.status(404).json({
        success: false,
        message: "Video not found",
      });

    }

    video.caption = caption;

    await video.save();

    return res.json({
      success: true,
      video,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// delete singal video
export const deleteVideo = async (req, res) => {

  try {

    const video = await Video.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!video) {

      return res.status(404).json({
        success: false,
        message: "Video not found",
      });

    }

    await video.deleteOne();

    return res.json({
      success: true,
      message: "Video deleted successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};