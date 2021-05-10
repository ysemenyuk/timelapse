import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './camera.css';

const CameraScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const selectedCamera = useSelector((state) => state.camera.selectedItem);

  const handleEdit = () => {
    history.push(`/camera/${selectedCamera._id}`);
  };

  return (
    <div className='col-12 px-3 mb-4'>
      <h6 className='mb-3'>Camera screenshot</h6>
      <div className='mb-4'>
        <img
          src='/api/assets/no_image.png'
          className='file_screenshot img-thumbnail'
        />
      </div>
      <div className='mb-4'>
        <button className='btn btn-primary'>Create screenshot</button>
      </div>

      <h6 className='mb-3'>Last screenshots</h6>
      <div className='mb-4'>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>img--2021-05-01--10-26.jpg</li>
          <li className='list-group-item'>img--2021-05-01--10-26.jpg</li>
          <li className='list-group-item'>img--2021-05-01--10-26.jpg</li>
        </ul>
      </div>
      <div className='mb-4'>
        <button className='btn btn-primary' onClick={handleEdit}>
          Camera files
        </button>
      </div>
    </div>
  );
};

export default CameraScreen;