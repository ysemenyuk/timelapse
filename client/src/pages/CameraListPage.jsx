import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { cameraActions } from "../store/cameraSlice.js";
import cameraThunks from "../thunks/cameraThunks.js";

import CameraList from "../components/CameraList.jsx";
import CameraFormEdit from "../components/CameraFormEdit.jsx";
import CameraScreen from "../components/CameraScreen.jsx";
// import CameraStatus from '../components/CameraStatus.jsx';
// import CameraInfo from '../components/CameraInfo.jsx';

const CameraListPage = () => {
  const dispatch = useDispatch();

  const cameras = useSelector((state) => state.camera.allCameras);
  const selectedCamera = useSelector((state) => state.camera.selectedCamera);

  useEffect(() => {
    if (selectedCamera === null && cameras.length !== 0) {
      dispatch(cameraActions.selectItem(cameras[0]));
    }
  }, []);

  useEffect(() => {
    if (cameras.length === 0) {
      dispatch(cameraThunks.fetchAll());
    }
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-3 px-3">
          <CameraList />
        </div>

        <div className="col-6 px-3">
          <CameraFormEdit />
        </div>
        <div className="col-3 px-3">
          <CameraScreen />
          {/* <CameraStatus /> */}
        </div>
      </div>
    </>
  );
};

export default CameraListPage;
