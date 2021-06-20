import React from 'react';
import { useSelector } from 'react-redux';

const UserProfilePage = () => {
  const { user } = useSelector((state) => state.user);
  console.log('user', user);

  return (
    <div className='row'>
      <div className='col-4 px-3'>
        <h6 className='mb-3'>User Profile</h6>
        <div className='mb-3'>
          <ul className='list-group'>
            <li className='list-group-item'>
              <span className='fw-bold'>username:</span> {user.username}
            </li>
            <li className='list-group-item'>
              <span className='fw-bold'>email:</span> {user.email}
            </li>
          </ul>
        </div>

        <div className='d-grid gap-2 d-flex justify-content-start'>
          <button className='btn btn-sm btn-primary'>Edit</button>
          <button className='btn btn-sm btn-primary'>Delete</button>
        </div>
      </div>

      <div className='col-4 px-3'>
        <h6 className='mb-3'>Avatar</h6>
        <div className='mb-3'>
          <img
            // height='165px'
            width='200px'
            src='/files/assets/no_img.png'
            className='img-thumbnail'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='formFile' className='form-label'>
            File input
          </label>
          <input className='form-control form-control-sm' type='file' id='formFile'></input>
        </div>

        <div className='d-grid gap-2 d-flex justify-content-start'>
          <button className='btn btn-sm btn-primary'>Upload</button>
          <button className='btn btn-sm btn-primary'>Delete</button>
          <button className='btn btn-sm btn-primary'>Save</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
