// export const login = (req, res) => {

//   res.send("Login Route");

// };

// export const callback = (req, res) => {

//   res.send("Callback Route");

// };




import crypto from "crypto";

export const login = async (req, res) => {

  const state = crypto.randomBytes(16).toString("hex");

  const params = new URLSearchParams({
    client_key: process.env.CLIENT_KEY,
    scope: process.env.SCOPES,
    response_type: "code",
    redirect_uri: process.env.REDIRECT_URI,
    state,
  });


  const authUrl = `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;

  return res.redirect(authUrl);
};

export const callback = async (req, res) => {

  const { code, state, error } = req.query;

  if (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }

  return res.json({
    success: true,
    message: "Authorization code received.",
    code,
    state,
  });
};