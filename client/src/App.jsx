import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Spinner from './components/Spinner.jsx';
import Error from './components/Error.jsx';

import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import CameraListPage from './pages/CameraListPage.jsx';
import CameraPage from './pages/CameraPage.jsx';
import CameraFormPage from './pages/CameraFormPage.jsx';

import userThunks from './thunks/userThunks.js';
import { userActions } from './store/userSlice.js';

const App = () => {
  // console.log('App');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  console.log('app user', user);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    userInfo?.token && user.isLogin !== true
      ? dispatch(userThunks.auth())
      : dispatch(userActions.logout());
  }, []);

  return (
    <div className='container p-2'>
      <Router>
        <Navbar />
        {user.isLogin === true ? (
          <Switch>
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={SignupPage} />
            <Route path='/form' component={CameraFormPage} />
            <Route path='/camera/:id' component={CameraPage} />
            <Route exact path='/' component={CameraListPage} />
            <Redirect to='/' />
          </Switch>
        ) : user.isLogin === false ? (
          <Switch>
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={SignupPage} />
            <Redirect to='/login' />
          </Switch>
        ) : (
          <Spinner />
        )}
      </Router>
    </div>
  );
};

export default App;
