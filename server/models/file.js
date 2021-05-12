import mongoose from "mongoose";

const FileSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  path: { type: String, default: "" },
  size: { type: Number, default: 0 },
  date: { type: Date, default: Date.now() },
  camera: { type: mongoose.ObjectId, ref: "Camera" },
  parent: { type: mongoose.ObjectId, ref: "File" },
  childs: [{ type: mongoose.ObjectId, ref: "File" }],
});

const File = mongoose.model("File", FileSchema);

export default File;
