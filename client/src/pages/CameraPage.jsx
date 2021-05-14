import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// import { cameraActions } from '../store/cameraSlice.js';
// import { formActions } from '../store/formSlice.js';
import { fileActions } from '../store/fileSlice.js';
import cameraThunks from '../thunks/cameraThunks.js';
import fileThunks from '../thunks/fileThunks.js';

import CameraFormEdit from '../components/CameraFormEdit.jsx';
import CameraFiles from '../components/CameraFiles.jsx';
import CameraStatus from '../components/CameraStatus.jsx';

const CameraPage = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const { id } = useParams();

  // const cameras = useSelector((state) => state.camera.allItems);
  const selectedCamera = useSelector((state) => state.camera.selectedItem);
  // const form = useSelector((state) => state.form);

  useEffect(() => {
    if (selectedCamera === null) {
      dispatch(cameraThunks.fetchOne(id)).then(({ payload }) => {
        console.log(111, selectedCamera);
        dispatch(fileActions.setCurrentDir(payload._id));
        dispatch(fileThunks.fetchAll(payload.dir));
      });
    }
  }, []);

  // useEffect(() => {
  //   dispatch(fileThunks.fetchAll(selectedCamera.dir));
  // }, []);

  return (
    <div className='row'>
      <div className='col-4 px-3'>
        {/* <CameraStatus /> */}
        <CameraFormEdit />
      </div>
      <div className='col-8 px-3'>
        <CameraFiles />
      </div>
    </div>
  );
};

export default CameraPage;
