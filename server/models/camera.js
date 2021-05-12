import mongoose from "mongoose";

const CameraSchema = mongoose.Schema({
  files: [{ type: mongoose.ObjectId, ref: "File" }],
  name: { type: String, required: true },
  description: { type: String, required: true },
  rtspLink: { type: String, default: "" },
  jpegLink: { type: String, default: "" },
  jpegCreateInterval: { type: String, default: "" },
  jpegCreateStartTime: { type: String, default: "" },
  jpegCreateStopTime: { type: String, default: "" },
});

const Camera = mongoose.model("Camera", CameraSchema);

export default Camera;
