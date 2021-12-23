import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { formActions } from '../../store/formSlice.js';
import cameraThunks from '../../thunks/cameraThunks.js';

import Info from './Info.jsx';

const CameraInfo = ({ selectedCamera }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async () => {
    dispatch(cameraThunks.deleteOne(selectedCamera));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(formActions.showEditForm(true));
  };

  const handleCameraPage = () => {
    history.push(`/cameras/${selectedCamera._id}`);
  };

  if (selectedCamera === null) {
    return null;
  }

  return (
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>CameraInfo</h6>
      <Info selectedCamera={selectedCamera} />

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
