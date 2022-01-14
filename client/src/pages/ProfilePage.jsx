import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Message from '../components/UI/Message.jsx';
import userThunks from '../thunks/userThunks.js';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [file, setFile] = useState(null);

  const handleUploadAvatar = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('avatar', file);

    dispatch(userThunks.uploadAvatar({ userId: user._id, formData }));
  };

  const handleDeleteAvatar = async (e) => {
    e.preventDefault();
    dispatch(userThunks.deleteAvatar({ userId: user._id }));
  };

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    if (password.length < 6 || password !== confirmPassword) {
      setMessage('Invalid passwords');
      return;
    }

    setMessage(null);

    const values = { name, email, password };
    dispatch(userThunks.updateOne({ userId: user._id, values }));
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
  };

  return (
    <Row>
      <Col sm={4}>
        <h6 className='mb-3'>Avatar</h6>
        <div className='mb-3'>
          <img
            width='200px'
            height='200px'
            src={`/files/user-files/${user.avatar}`}
            className='img-thumbnail'
          />
        </div>

        <Form className='mb-3' onSubmit={handleUploadAvatar}>
          <Form.Group controlId='formFile' className='mb-3'>
            <Form.Control type='file' name='avatar' onChange={(e) => setFile(e.target.files[0])} />
          </Form.Group>

          <>
            <Button variant='primary' onClick={handleDeleteAvatar} size='sm' className='me-2'>
              Delete
            </Button>
            <Button variant='primary' type='submit' size='sm' className='me-2'>
              Save
            </Button>
          </>
        </Form>
      </Col>

      <Col sm={4}>
        <h6 className='mb-3'>User Profile</h6>

        {message && <Message variant='danger'>{message}</Message>}

        <Form className='mb-3' onSubmit={handleUpdateUser}>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='username'>Username</Form.Label>
            <Form.Control
              type='username'
              name='username'
              id='username'
              autoComplete='username'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label htmlFor='email'>Email address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              id='email'
              autoComplete='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              id='password'
              autoComplete='current-password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label htmlFor='confirmPassword'>Confirm password</Form.Label>
            <Form.Control
              type='password'
              name='confirmPassword'
              id='confirmPassword'
              autoComplete='current-password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </Form.Group>

          <>
            <Button variant='primary' onClick={handleDeleteUser} size='sm' className='me-2'>
              Delete
            </Button>
            <Button variant='primary' type='submit' size='sm' className='me-2'>
              Save
            </Button>
          </>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfilePage;
