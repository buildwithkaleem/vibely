// import mongoose from "mongoose";

// const videoSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },

//     cloudinaryUrl: String,

//     publicId: String,

//     caption: String,
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("Video", videoSchema);






import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cloudinaryUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      default: "",
    },

    caption: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: [
        "uploading",
        "draft",
        "published",
        "failed"
      ],
      default: "uploading"
    },

    publishId: String,

    platform: {
      type: String,
      default: "tiktok"
    },

    errorMessage: String
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Video", videoSchema);