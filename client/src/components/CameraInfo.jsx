import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { formActions } from '../store/formSlice.js';
import cameraThunks from '../thunks/cameraThunks.js';

const CameraInfo = ({ selectedCamera }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  if (selectedCamera === null) {
    return null;
  }

  const handleDelete = async () => {
    dispatch(cameraThunks.deleteOne(selectedCamera));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(formActions.set({ show: true, type: 'editCamera' }));
  };

  const handleCameraPage = () => {
    history.push(`/cameras/${selectedCamera._id}`);
  };

  return (
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>Camera</h6>
      <div className='mb-3'>
        <ul className='list-group'>
          <li className='list-group-item'>
            <div className='me-3'>Name: </div>
            <div className='col-9 text-truncate fw-bold'>{selectedCamera.name}</div>
          </li>
          <li className='list-group-item'>
            <div className='me-3'>Description: </div>
            <div className='col-9 text-truncate fw-bold'>{selectedCamera.description}</div>
          </li>
          <li className='list-group-item'>
            <div className='d-flex justify-content-between align-items-start'>
              <div className='me-3'>jpeg Link: </div>
              <span className='badge bg-success'>ok</span>
            </div>
            <div className='col-9 text-truncate text-muted'>{selectedCamera.jpegLink}</div>
          </li>
          <li className='list-group-item'>
            <div className='d-flex justify-content-between align-items-start'>
              <div className='me-3'>rtsp Link: </div>
              <div className='badge bg-danger'>bad</div>
            </div>
            <div className='col-9 text-truncate text-muted'>{selectedCamera.rtspLink}</div>
          </li>
        </ul>
      </div>

      <div className='d-grid gap-2 d-flex justify-content-start'>
        <button className='btn btn-sm btn-primary' onClick={handleEdit}>
          Edit
        </button>
        <button className='btn btn-sm btn-primary' onClick={handleDelete}>
          Delete
        </button>
        <button className='btn btn-sm btn-primary' onClick={handleCameraPage}>
          CameraPage
        </button>
      </div>
    </div>
  );
};

export default CameraInfo;
