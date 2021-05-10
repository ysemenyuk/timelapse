import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { cameraActions } from '../store/cameraSlice.js';
import { formActions } from '../store/formSlice.js';
import cameraThunks from '../thunks/cameraThunks.js';

import CameraFormEdit from '../components/CameraFormEdit.jsx';
import CameraFiles from '../components/CameraFiles.jsx';
import CameraInfo from '../components/CameraInfo.jsx';

const CameraPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // const cameras = useSelector((state) => state.camera.allItems);
  // const selectedCamera = useSelector((state) => state.camera.selectedItem);
  const form = useSelector((state) => state.form);

  const handleBack = () => {
    history.push('/');
  };

  // const handleDelete = async () => {
  //   dispatch(cameraThunks.deleteOne(selectedCamera));
  // };

  // const handleEdit = (e) => {
  //   e.preventDefault();
  //   dispatch(formActions.set({ show: true, type: 'edit' }));
  // };

  // console.log('CamerasPage cameras', cameras);
  // console.log('CamerasPage selectedCamera -', selectedCamera);
  // console.log('CamerasPage form -', form);

  return (
    <>
      <div className='row m-0'>
        <div className='mb-3 d-grid gap-2 d-flex justify-content-start'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={handleBack}
          >
            Back to list
          </button>
          {/* <button
            type='button'
            className='btn btn-primary'
            onClick={handleDelete}
          >
            Delete camera
          </button>
          <button
            type='button'
            className='btn btn-primary'
            onClick={handleEdit}
          >
            Edit camera
          </button> */}
        </div>
      </div>
      <div className='row m-0'>
        <div className='col-4 px-3'>
          {form.type === 'edit' ? <CameraFormEdit /> : <CameraInfo />}
        </div>
        <div className='col-8 px-3'>
          <CameraFiles />
        </div>
      </div>
    </>
  );
};

export default CameraPage;
