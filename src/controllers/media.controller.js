import axios from "axios";
import Video from "../models/Video.js";

export const streamVideo = async (req, res) => {

  const video = await Video.findById(req.params.id);

  if (!video) {

    return res.status(404).json({

      success: false,

      message: "Video not found"

    });

  }

  const response = await axios({

    url: video.cloudinaryUrl,

    method: "GET",

    responseType: "stream"

  });

  res.setHeader(

    "Content-Type",

    "video/mp4"

  );

  response.data.pipe(res);

};