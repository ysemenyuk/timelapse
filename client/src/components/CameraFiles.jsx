import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./camera.css";

import { fileActions } from "../store/fileSlice.js";
import fileThunks from "../thunks/fileThunks.js";

const dirLogo = "/files/assets/folder-img.png";
const fileLogo = "/files/assets/file-img.png";

const CameraFiles = () => {
  const dispatch = useDispatch();

  const currentDir = useSelector((state) => state.file.currentDir);
  const dirStack = useSelector((state) => state.file.dirStack);
  const files = useSelector((state) => state.file.allItems);

  useEffect(() => {
    if (currentDir !== null) {
      dispatch(fileThunks.fetchAll(currentDir));
    }
  }, [currentDir]);

  const openDirHandler = (file) => {
    if (file.type === "dir") {
      // dispatch(fileActions.setCurrentDir(file._id));
      dispatch(fileActions.pushToDirStack({ currentDir, file }));
    }
  };

  const backClickHandler = () => {
    // const backDirId = dirStack[dirStack.length - 1];
    // dispatch(fileActions.setCurrentDir(backDirId));
    dispatch(fileActions.popFromDirStack());
  };

  if (currentDir === null) {
    return (
      <div className="col-12 mb-3">
        <h6 className="mb-3">Files</h6>
        <div>No selected camera.</div>
      </div>
    );
  }

  return (
    <div className="col-12 mb-3">
      <h6 className="mb-3">Files</h6>

      <div className="mb-3">
        {"home /"}
        {dirStack.map((dir) => (
          <span key={dir}>{` ${dir} /`}</span>
        ))}
      </div>

      <div className="mb-3 d-grid gap-2 d-flex justify-content-start">
        {dirStack.length > 0 && (
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={backClickHandler}
          >
            Back
          </button>
        )}

        <button
          type="button"
          className="btn btn-sm btn-primary"
          // onClick={handleEdit}
        >
          New folder
        </button>
      </div>

      <div className="files_container overflow-auto">
        {files.length === 0 ? (
          <div>No files.</div>
        ) : (
          files.map((file) => (
            <div
              key={file._id}
              className="file_plate col-2"
              onClick={() => openDirHandler(file)}
            >
              <img
                src={file.type === "dir" ? dirLogo : fileLogo}
                // src="/files/609be1084eff73304811605d/screenshots/img-2021-03-22--07-00-17.jpg"
                className="file_plate_img img-thumbnail"
              />
              <div className="file_plate_name">{file.name}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CameraFiles;

{
}
