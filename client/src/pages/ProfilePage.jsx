import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Message from '../components/UI/Message.jsx';

import userThunks from '../thunks/userThunks.js';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // console.log('user', user);

  const [file, setFile] = useState(null);

  const onUploadAvatar = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('avatar', file);

    dispatch(userThunks.uploadAvatar({ userId: user._id, formData }));
  };

  const onDeleteAvatar = async (e) => {
    e.preventDefault();

    dispatch(userThunks.deleteAvatar({ userId: user._id }));
  };

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const onUpdateUser = async (e) => {
    e.preventDefault();

    if (password.length < 6 || password !== confirmPassword) {
      setMessage('Invalid passwords');
      return;
    }

    setMessage(null);

    const values = { name, email, password };
    dispatch(userThunks.updateOne({ userId: user._id, values }));
  };

  const onDeleteUser = async (e) => {
    e.preventDefault();
  };

  return (
    <div className='row'>
      <div className='col-4 px-3'>
        <h6 className='mb-3'>Avatar</h6>
        <div className='mb-3'>
          <img
            width='200px'
            height='200px'
            src={`/files/${user.avatar}`}
            className='img-thumbnail'
          />
        </div>

        <form className='mb-3' onSubmit={onUploadAvatar}>
          <div className='mb-3'>
            <input
              className='form-control'
              type='file'
              name='avatar'
              id='file-input'
              onChange={(e) => setFile(e.target.files[0])}></input>
          </div>

          <div className='d-grid gap-2 d-flex justify-content-start'>
            <button onClick={onDeleteAvatar} className='btn btn-sm btn-primary'>
              Delete
            </button>
            <button type='submit' className='btn btn-sm btn-primary'>
              Save
            </button>
          </div>
        </form>
      </div>

      <div className='col-4 px-3'>
        <h6 className='mb-3'>User Profile</h6>

        {message && <Message variant='danger'>{message}</Message>}

        <form className='mb-3' onSubmit={onUpdateUser}>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              type='name'
              name='name'
              id='name'
              autoComplete='text'
              className='form-control'
              onChange={(e) => setName(e.target.value)}
              value={name}></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              autoComplete='email'
              className='form-control'
              onChange={(e) => setEmail(e.target.value)}
              value={email}></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              autoComplete='password'
              className='form-control'
              onChange={(e) => setPassword(e.target.value)}
              value={password}></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Confirm password
            </label>
            <input
              type='password'
              name='confirm-password'
              id='confirm-password'
              autoComplete='password'
              className='form-control'
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}></input>
          </div>

          <div className='d-grid gap-2 d-flex justify-content-start'>
            <button onClick={onDeleteUser} className='btn btn-sm btn-primary'>
              Delete
            </button>
            <button type='submit' className='btn btn-sm btn-primary'>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
