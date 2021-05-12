import path from "path";

import { __dirname } from "../index.js";

const getCameraPaths = (camera) => {
  const pathToCamDir = path.join(__dirname, "..", "cameras", camera.id);

  return {
    pathToCamDir,
    pathToScreenshotsDir: path.join(pathToCamDir, "screenshots"),
    pathToImagesDir: path.join(pathToCamDir, "images"),
    pathToVideosDir: path.join(pathToCamDir, "videos"),
    pathToLogFile: path.join(pathToCamDir, `${camera.id}-camera-log.txt`),
  };
};

export { getCameraPaths };
