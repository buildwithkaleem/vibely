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
      console.log("TikTok Error:", err.response?.data || err.message);
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




// import User from "../models/User.js";
// import Video from "../models/Video.js";
// import { createTikTokDraft } from "../services/tiktok.upload.service.js";

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

//     // Save video
//     const video = await Video.create({
//       user: req.user._id,
//       cloudinaryUrl: videoUrl,
//       caption,
//     });

//     // TikTok ko apna verified URL do
//     const result = await createTikTokDraft(
//       user.accessToken,
//       `https://vibely.egrif.online/api/media/video/${video._id}`
//     );

//     return res.json({
//       success: true,
//       video,
//       tiktok: result,
//     });

//   } catch (error) {
//     console.log(error.response?.data || error);

//     return res.status(500).json(
//       error.response?.data || {
//         error: error.message,
//       }
//     );
//   }
// };



// import { createTikTokDraft } from "../services/tiktok.upload.service.js";
// import User from "../models/User.js";
// import Video from "../models/Video.js";

// export const uploadVideo = async (req, res) => {
//   try {

//     const { videoUrl } = req.body;

//     if (!videoUrl) {
//       return res.status(400).json({
//         success: false,
//         message: "Video URL is required",
//       });
//     }

//     const user = await User.findById(req.user._id);

//     const draft = await createTikTokDraft(
//       user.accessToken,
//       `https://vibely.egrif.online/api/media/video/${Video._id}`
//     );

//     // const result = await createTikTokDraft(
//     //   user.accessToken,
//     //   videoUrl
//     // );

//     return res.json(result);

//   } catch (error) {

//     console.log(error.response?.data);

//     return res.status(500).json(
//       error.response?.data || {
//         error: error.message,
//       }
//     );

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