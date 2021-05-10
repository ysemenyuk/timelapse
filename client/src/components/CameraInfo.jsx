import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { formActions } from '../store/formSlice.js';
import cameraThunks from '../thunks/cameraThunks.js';

const CameraInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const selectedCamera = useSelector((state) => state.camera.selectedItem);
  const form = useSelector((state) => state.form);

  console.log('CameraInfo selectedCamera -', selectedCamera);

  if (selectedCamera === null) {
    return <div>No selected camera.</div>;
  }

  const handleDelete = async () => {
    dispatch(cameraThunks.deleteOne(selectedCamera));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(formActions.set({ show: true, type: 'edit' }));
  };

  return (
    <div className='col-12 px-3 mb-4'>
      <h6 className='mb-1'>Camera</h6>
      <div className='mb-4'>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item d-flex justify-content-between align-items-start'>
            <div>name</div>
            <div>{selectedCamera.name}</div>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-start'>
            <div>description</div>
            <div>{selectedCamera.description}</div>
          </li>
        </ul>
      </div>

      <h6 className='mb-1'>Status</h6>
      <div className='mb-4'>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item d-flex justify-content-between align-items-start'>
            <div>rtspLink</div>
            <span className='badge bg-success'>good</span>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-start'>
            <div>jpgLink</div>
            <span className='badge bg-success'>good</span>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-start'>
            <div>create Jpg with interval</div>
            <span className='badge bg-danger'>stop</span>
          </li>
        </ul>
      </div>

      <h6 className='mb-1'>Settings</h6>
      <div className='mb-4'>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item d-flex justify-content-between align-items-start'>
            <div className='me-3'>jpegLink:</div>
            <div className='text-truncate'>{selectedCamera.jpegLink}</div>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-start'>
            <div className='me-3'>rtspLink:</div>
            <div className='text-truncate'>{selectedCamera.rtspLink}</div>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-start'>
            <div className='me-3'>jpegCreateStartTime:</div>
            <div>{selectedCamera.jpegCreateStartTime}</div>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-start'>
            <div className='me-3'>jpegCreateStopTime:</div>
            <div>{selectedCamera.jpegCreateStopTime}</div>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-start'>
            <div className='me-3'>jpegCreateInterval:</div>
            <div>{selectedCamera.jpegCreateInterval}</div>
          </li>
        </ul>
      </div>

      <div className='mb-4'></div>
      <div className='d-grid gap-2 d-flex justify-content-start'>
        <button className='btn btn-primary' onClick={handleDelete}>
          Delete
        </button>
        <button className='btn btn-primary' onClick={handleEdit}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default CameraInfo;
