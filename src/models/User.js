// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     openId: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     displayName: {
//       type: String,
//     },

//     avatar: {
//       type: String,
//     },

//     username: {
//       type: String,
//     },

//     accessToken: {
//       type: String,
//       required: true,
//     },

//     refreshToken: {
//       type: String,
//       required: true,
//     },

//     tokenExpiresIn: {
//       type: Number,
//     },

//     refreshExpiresIn: {
//       type: Number,
//     },

//     scope: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("User", userSchema);





import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    openId: {
      type: String,
      required: true,
      unique: true,
    },

    unionId: String,

    displayName: String,

    avatar: String,

    accessToken: {
      type: String,
      required: true,
    },

    refreshToken: {
      type: String,
      required: true,
    },

    tokenExpiresIn: Number,

    refreshExpiresIn: Number,

    scope: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);