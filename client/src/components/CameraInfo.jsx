import React from 'react';
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import { formActions } from '../store/formSlice.js';
import cameraThunks from '../thunks/cameraThunks.js';

const CameraInfo = ({ selectedCamera }) => {
  const dispatch = useDispatch();

  if (selectedCamera === null) {
    return null;
  }

  const handleDelete = async () => {
    dispatch(cameraThunks.deleteOne(selectedCamera));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(formActions.set({ show: true, type: 'edit' }));
  };

  return (
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>Settings</h6>
      <div className='mb-3'>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            <div className='me-3 fw-bold'>name</div>
            <div>{selectedCamera.name}</div>
          </li>
          <li className='list-group-item'>
            <div className='me-3 fw-bold'>description</div>
            <div>{selectedCamera.description}</div>
          </li>
          <li className='list-group-item'>
            <div className='me-3 fw-bold'>jpegLink</div>
            <div className='text-truncate'>{selectedCamera.jpegLink}</div>
          </li>
          <li className='list-group-item'>
            <div className='me-3 fw-bold'>rtspLink</div>
            <div className='text-truncate'>{selectedCamera.rtspLink}</div>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-start'>
            <div className='me-3 fw-bold'>jpegCreateStartTime:</div>
            <div>{selectedCamera.jpegCreateStartTime}</div>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-start'>
            <div className='me-3 fw-bold'>jpegCreateStopTime:</div>
            <div>{selectedCamera.jpegCreateStopTime}</div>
          </li>
          <li className='list-group-item d-flex justify-content-between'>
            <div className='me-3 fw-bolder'>jpegCreateInterval:</div>
            <div>{selectedCamera.jpegCreateInterval}</div>
          </li>
        </ul>
      </div>

      <div className='d-grid gap-2 d-flex justify-content-start'>
        <button className='btn btn-primary' onClick={handleDelete}>
          Delete
        </button>
        <button className='btn btn-primary' onClick={handleEdit}>
          Edit settings
        </button>
      </div>
    </div>
  );
};

export default CameraInfo;
