import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import videoRoutes from "./routes/video.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use(
  "/uploads",
  express.static(path.resolve("uploads"))
);
app.use("/api/media", mediaRoutes);

export default app;