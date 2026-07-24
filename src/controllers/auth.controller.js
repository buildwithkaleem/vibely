// export const login = (req, res) => {

//   res.send("Login Route");

// };

// export const callback = (req, res) => {

//   res.send("Callback Route");

// };



import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { getTikTokUser } from "../services/tiktok.service.js";
import crypto from "crypto";
import axios from "axios";

export const login = async (req, res) => {

  const state = crypto.randomBytes(16).toString("hex");

  const params = new URLSearchParams({
    client_key: process.env.TIKTOK_CLIENT_KEY,
    scope: process.env.SCOPES,
    response_type: "code",
    redirect_uri: process.env.TIKTOK_REDIRECT_URI,
    state,
  });

  const authUrl = `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;


  return res.redirect(authUrl);
};



// export const callback = async (req, res) => {
//   try {
//     const { code } = req.query;

//     // 1. Authorization Code → Access Token
//     const response = await axios.post(
//       "https://open.tiktokapis.com/v2/oauth/token/",
//       new URLSearchParams({
//         client_key: process.env.TIKTOK_CLIENT_KEY,
//         client_secret: process.env.TIKTOK_CLIENT_SECRET,
//         code,
//         grant_type: "authorization_code",
//         redirect_uri: process.env.TIKTOK_REDIRECT_URI,
//       }),
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );

//     // 2. Access Token se TikTok User Profile lao
//     const profile = await getTikTokUser(response.data.access_token);

//     console.log("========== PROFILE ==========");
//     console.log(profile);

//     // 3. Browser ko response bhejo
//     return res.json({
//       token: response.data,
//       profile,
//     });

//   } catch (err) {
//     console.error(err.response?.data || err.message);

//     return res.status(500).json(
//       err.response?.data || { error: err.message }
//     );
//   }
// };

export const callback = async (req, res) => {
  try {
    const { code } = req.query;

    const response = await axios.post(
      "https://open.tiktokapis.com/v2/oauth/token/",
      new URLSearchParams({
        client_key: process.env.TIKTOK_CLIENT_KEY,
        client_secret: process.env.TIKTOK_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.TIKTOK_REDIRECT_URI,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const profile = await getTikTokUser(
      response.data.access_token
    );

    console.log(profile);

    return res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);

    return res.status(500).json(err.response?.data || { error: err.message });
  }
};

// export const callback = async (req, res) => {

//   const { code, state, error } = req.query;

//   if (error) {
//     return res.status(400).json({
//       success: false,
//       error,
//     });
//   }

//   return res.json({
//     success: true,
//     message: "Authorization code received.",
//     code,
//     state,
//   });
// };