import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadVideoToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",
        folder: "vibely/videos",
      },
      (error, result) => {

        if (error) return reject(error);

        resolve(result);

      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);

  });
};