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

export const publishTikTokVideo = async (
  accessToken,
  videoUrl,
  caption
) => {
  const response = await axios.post(
    "https://open.tiktokapis.com/v2/post/publish/video/init/",
    {
      post_info: {
        title: caption || "",
        privacy_level: "PUBLIC_TO_EVERYONE",
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
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};