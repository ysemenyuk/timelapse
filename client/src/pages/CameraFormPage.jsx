import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from 'react-router-dom';

import { cameraActions } from "../store/cameraSlice.js";
// import { formActions } from '../store/formSlice.js';
import cameraThunks from "../thunks/cameraThunks.js";

import CameraList from "../components/CameraList.jsx";
import CameraForm from "../components/CameraForm.jsx";

const CameraFormPage = () => {
  const dispatch = useDispatch();
  // const history = useHistory();

  const cameras = useSelector((state) => state.camera.allItems);
  const selectedCamera = useSelector((state) => state.camera.selectedItem);
  // const form = useSelector((state) => state.form);

  useEffect(() => {
    if (cameras.length === 0) {
      dispatch(cameraThunks.fetchAll());
    }
  }, []);

  useEffect(() => {
    if (selectedCamera !== null) {
      dispatch(cameraActions.selectItem(null));
    }
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-3 px-3">
          <CameraList />
        </div>
        <div className="col-6 px-3">
          <CameraForm />
        </div>
      </div>
    </>
  );
};

export default CameraFormPage;
