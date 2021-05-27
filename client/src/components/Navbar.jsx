import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { userActions } from '../store/userSlice.js';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light mb-4'>
      <div className='container-fluid px-3'>
        <Link className='navbar-brand mb-0 h1' to='/'>
          Timelapse
        </Link>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                All cameras
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/form'>
                Add new camera
              </Link>
            </li>
          </ul>
        </div>
        {user.isLogin === true ? (
          <button
            onClick={() => dispatch(userActions.logout())}
            className='btn btn-link'
          >
            LogOut
          </button>
        ) : user.isLogin === false ? (
          <>
            <Link className='me-3' to='/login'>
              LogIn
            </Link>
            <Link className='me-3' to='/signup'>
              Signup
            </Link>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
