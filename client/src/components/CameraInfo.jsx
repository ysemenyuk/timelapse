import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { formActions } from '../store/index.js';
import cameraThunks from '../thunks/cameraThunks.js';

const CameraInfo = () => {
  const dispatch = useDispatch();
  const selectedCamera = useSelector((state) => state.camera.selectedItem);
  // const form = useSelector((state) => state.form);

  // console.log('CameraInfo selectedCamera -', selectedCamera);

  if (selectedCamera === null) {
    return <div>No camera.</div>;
  }

  const handleDelete = async () => {
    dispatch(cameraThunks.deleteOne(selectedCamera));
  };

  const handleEdit = () => {
    dispatch(formActions.set({ show: true, type: 'edit' }));
  };

  return (
    <div className='mb-3'>
      <div className='mb-3'>Selected Camera Info</div>

      <div className='mb-3'>
        <form className='row g-3'>
          <div className='col-md-8'>
            <label htmlFor='name' className='form-label'>
              name
            </label>
            <input
              value={selectedCamera.name}
              disabled
              id='name'
              name='name'
              type='text'
              className='form-control'
            ></input>
          </div>

          <div className='col-md-8'>
            <label htmlFor='description' className='form-label'>
              description
            </label>
            <input
              value={selectedCamera.description}
              disabled
              id='description'
              name='description'
              type='text'
              className='form-control'
            ></input>
          </div>

          <div className='col-md-8'>
            <label htmlFor='name' className='form-label'>
              rtspLink
            </label>
            <input
              value={selectedCamera.rtspLink}
              disabled
              id='rtspLink'
              name='rtspLink'
              type='text'
              className='form-control'
            ></input>
          </div>

          <div className='col-md-8'>
            <label htmlFor='name' className='form-label'>
              jpegLink
            </label>
            <input
              value={selectedCamera.jpegLink}
              disabled
              id='jpegLink'
              name='jpegLink'
              type='text'
              className='form-control'
            ></input>
          </div>
        </form>
      </div>

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
