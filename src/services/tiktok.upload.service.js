import axios from "axios";

export const createTikTokDraft = async (
  accessToken,
  videoUrl
) => {

  const response = await axios.post(
    "https://open-api.tiktok.com/v2/post/publish/inbox/video/init/",
    {
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