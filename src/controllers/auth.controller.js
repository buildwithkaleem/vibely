// export const login = (req, res) => {

//   res.send("Login Route");

// };

// export const callback = (req, res) => {

//   res.send("Callback Route");

// };



import User from "../models/User.js";
// import generateToken from "../utils/generateToken.js";
// import { getTikTokUser } from "../services/tiktok.service.js";
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



import { getTikTokUser } from "../services/tiktok.service.js";
import generateToken from "../utils/generateToken.js";

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

    let user = await User.findOne({
      openId: profile.open_id,
    });

    if (!user) {
      user = await User.create({
        openId: profile.open_id,
        unionId: profile.union_id,

        displayName: profile.display_name,

        avatar: profile.avatar_url,

        accessToken: response.data.access_token,

        refreshToken: response.data.refresh_token,

        tokenExpiresIn: response.data.expires_in,

        refreshExpiresIn:
          response.data.refresh_expires_in,

        scope: response.data.scope,
      });
    } else {
      user.accessToken = response.data.access_token;

      user.refreshToken = response.data.refresh_token;

      user.tokenExpiresIn = response.data.expires_in;

      user.refreshExpiresIn =
        response.data.refresh_expires_in;

      user.scope = response.data.scope;

      user.displayName = profile.display_name;

      user.avatar = profile.avatar_url;

      await user.save();
    }

    // 👇 YAHAN JWT banao
    const token = generateToken(user._id);

    // 👇 YAHAN response bhejo
    // return res.json({
    //   success: true,
    //   token,
    //   user,
    // });

    return res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        displayName: user.displayName,
        avatar: user.avatar,
        openId: user.openId,
      },
    });
  } catch (err) {
    console.error(err.response?.data || err.message);

    return res.status(500).json(err.response?.data || { error: err.message });
  }
};


// export const callback = async (req, res) => {
//   try {
//     const { code } = req.query;

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

//     const profile = await getTikTokUser(
//       response.data.access_token
//     );

//     console.log(profile);

//     // return res.json(response.data);
//     return res.json({
//       token: response.data,
//       profile,
//     });
//   } catch (err) {
//     console.error(err.response?.data || err.message);

//     return res.status(500).json(err.response?.data || { error: err.message });
//   }
// };
