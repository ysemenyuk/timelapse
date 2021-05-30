import React from 'react';
import { useSelector } from 'react-redux';

import CameraList from '../components/CamerasList.jsx';

// import userThunks from '../thunks/userThunks.js';

const UserProfilePage = () => {
  const { user } = useSelector((state) => state.user);
  const selectedCamera = useSelector((state) => state.camera.selectedCamera);

  return (
    <div className='row'>
      <div className='col-3 px-3'>
        <CameraList selectedCamera={selectedCamera} />
      </div>
      <div className='col-3 px-3'>
        <h6 className='mb-3'>User Profile</h6>
        <div className='mb-3'>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              <span className='fw-bold'>username:</span> {user.username}
            </li>
            <li className='list-group-item'>
              <span className='fw-bold'>email:</span> {user.email}
            </li>
          </ul>
        </div>

        <div className='d-grid gap-2 d-flex justify-content-start'>
          <button className='btn btn-primary'>Delete</button>
          <button className='btn btn-primary'>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
