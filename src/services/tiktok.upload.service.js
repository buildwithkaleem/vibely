// video Draft
// import axios from "axios";

// export const createTikTokDraft = async (
//   accessToken,
//   videoUrl
// ) => {

//   const response = await axios.post(
//     "https://open-api.tiktok.com/v2/post/publish/inbox/video/init/",
//     // "https://open-api.tiktok.com/v2/post/publish/video/init/",
//     {
//       source_info: {
//         source: "PULL_FROM_URL",
//         video_url: videoUrl,
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   return response.data;
// };



// video publish
import axios from "axios";

const TIKTOK_API =
  "https://open.tiktokapis.com/v2/post/publish";


// ========================================
// 1. Get Creator Information
// ========================================

export const getTikTokCreatorInfo = async (accessToken) => {
  try {
    const response = await axios.post(
      `${TIKTOK_API}/creator_info/query/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "TikTok Creator Info Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};


// ========================================
// 2. Direct Publish Video
// ========================================

export const publishTikTokVideo = async ({
  accessToken,
  videoUrl,
  caption = "",
  privacyLevel,
}) => {
  try {
    const response = await axios.post(
      `${TIKTOK_API}/video/init/`,
      {
        post_info: {
          title: caption,
          privacy_level: privacyLevel,

          disable_duet: false,
          disable_comment: false,
          disable_stitch: false,
        },

        source_info: {
          source: "PULL_FROM_URL",
          video_url: videoUrl,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "TikTok Publish Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};