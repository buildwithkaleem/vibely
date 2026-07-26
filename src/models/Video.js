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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Video", videoSchema);