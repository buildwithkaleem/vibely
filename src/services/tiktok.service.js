
import axios from "axios";

export const getTikTokUser = async (accessToken) => {
  try {
    const response = await axios.get(
      "https://open.tiktokapis.com/v2/user/info/",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          fields:
            "open_id,union_id,display_name,avatar_url,avatar_large_url",
        },
      }
    );

    return response.data.data.user;
  } catch (error) {
    console.error(
      error.response?.data || error.message
    );
    throw error;
  }
};


// import axios from "axios";

// export const getTikTokUser = async (accessToken) => {
//   const response = await axios.post(
//     "https://open.tiktokapis.com/v2/user/info/",
//     {
//       fields: [
//         "open_id",
//         "display_name",
//         "avatar_url",
//         "username",
//       ],
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   return response.data.data.user;
// };




// import axios from "axios";

// export const getTikTokUser = async (accessToken) => {
//   try {
//     const response = await axios.post(
//       "https://open.tiktokapis.com/v2/user/info/",
//       {
//         fields: [
//           "open_id",
//           "union_id",
//           "avatar_url",
//           "display_name",
//           "username",
//         ],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("TikTok User API Response:");
//     console.log(response.data);

//     return response.data.data;
//   } catch (error) {
//     console.error(
//       "TikTok User Error:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };