import User from "../models/User.js";
import Video from "../models/Video.js";
import { getTikTokCreatorInfo, publishTikTokVideo } from "../services/tiktok.upload.service.js";


export const uploadVideo = async (req, res) => {
  try {
    const { videoUrl, caption } = req.body;

    if (!videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Video URL is required",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const video = await Video.create({
      user: user._id,
      cloudinaryUrl: videoUrl,
      caption: caption || "",
    });

    const tiktokVideoUrl =
      `https://vibeli-api.egrif.online/api/media/video/${video._id}`;

    // 1. Get creator information
    const creatorInfo = await getTikTokCreatorInfo(
      user.accessToken
    );

    if (creatorInfo?.error?.code !== "ok") {
      return res.status(400).json({
        success: false,
        message: "Unable to get TikTok creator information",

        // TikTok ka complete response
        tiktok: creatorInfo,
      });
    }

    const privacyOptions =
      creatorInfo?.data?.privacy_level_options || [];

    // Jo TikTok creator info mein available hai
    const privacyLevel = "PUBLIC_TO_EVERYONE";

    // 2. Check public privacy
    if (!privacyOptions.includes(privacyLevel)) {
      return res.status(400).json({
        success: false,
        message:
          "PUBLIC_TO_EVERYONE is not available for this TikTok account",

        privacyLevel,
        privacyOptions,

        creatorInfo: creatorInfo.data,
      });
    }

    // 3. Direct publish
    try {
      const tiktokResult = await publishTikTokVideo({
        accessToken: user.accessToken,
        videoUrl: tiktokVideoUrl,
        caption: caption || "",
        privacyLevel,
      });

      return res.status(200).json({
        success: true,
        message: "Video submitted to TikTok successfully",

        privacyLevel,
        privacyOptions,

        video,

        tiktok: tiktokResult,
      });

    } catch (error) {

      // TikTok publish error
      const tiktokError =
        error.response?.data || error.message;

      return res.status(500).json({
        success: false,
        message: "TikTok video publish failed",

        // IMPORTANT
        privacyLevel,
        privacyOptions,

        // Creator info bhi
        creatorInfo: creatorInfo.data,

        // TikTok ka actual error
        error: tiktokError,
      });
    }

  } catch (error) {

    console.error(
      "UPLOAD VIDEO ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Upload video failed",
      error:
        error.response?.data ||
        error.message,
    });
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

//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const video = await Video.create({
//       user: user._id,
//       cloudinaryUrl: videoUrl,
//       caption: caption || "",
//     });

//     const tiktokVideoUrl =
//       `https://vibeli-api.egrif.online/api/media/video/${video._id}`;

//     // 1️⃣ Get creator information
//     const creatorInfo = await getTikTokCreatorInfo(
//       user.accessToken
//     );

//     if (creatorInfo?.error?.code !== "ok") {
//       return res.status(400).json({
//         success: false,
//         message: "Unable to get TikTok creator information",
//         tiktok: creatorInfo,
//       });
//     }

//     const privacyOptions =
//       creatorInfo?.data?.privacy_level_options || [];

//     // 2️⃣ We specifically want public
//     if (!privacyOptions.includes("PUBLIC_TO_EVERYONE")) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "PUBLIC_TO_EVERYONE is not available for this TikTok account",
//         privacyOptions,
//       });
//     }

//     // 3️⃣ Direct publish
//     const tiktokResult = await publishTikTokVideo({
//       accessToken: user.accessToken,
//       videoUrl: tiktokVideoUrl,
//       caption: caption || "",
//       privacyLevel: "PUBLIC_TO_EVERYONE",
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Video submitted to TikTok successfully",
//       video,
//       tiktok: tiktokResult,
//     });

//   } catch (error) {

//     console.error(
//       "UPLOAD VIDEO ERROR:",
//       error.response?.data || error.message
//     );

//     return res.status(500).json({
//       success: false,
//       message: "TikTok video publish failed",
//       error:
//         error.response?.data ||
//         error.message,
//     });
//   }
// };


// export const uploadVideo = async (req, res) => {
//   try {
//     const { videoUrl, caption } = req.body;

//     if (!videoUrl) {
//       return res.status(400).json({
//         success: false,
//         message: "Video URL is required",
//       });
//     }

//     // Logged in user
//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Save video in database
//     const video = await Video.create({
//       user: user._id,
//       cloudinaryUrl: videoUrl,
//       caption: caption || "",
//     });

//     let tiktokResult = null;

//     try {
//       tiktokResult = await publishTikTokVideo(
//         user.accessToken,
//         `https://vibeli-api.egrif.online/api/media/video/${video._id}`
//       );
//     } catch (err) {

//       return res.status(500).json({
//         success: false,
//         error: err.response?.data || err.message
//       });

//     }

//     return res.json({
//       success: true,
//       message: "Video saved successfully",
//       video,
//       tiktok: tiktokResult,
//     });

//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };




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