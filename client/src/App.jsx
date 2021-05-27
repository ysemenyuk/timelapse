import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Navbar from './components/Navbar.jsx';

import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import CameraListPage from './pages/CameraListPage.jsx';
import CameraPage from './pages/CameraPage.jsx';
import CameraFormPage from './pages/CameraFormPage.jsx';

import userThunks from './thunks/userThunks.js';

const App = () => {
  // console.log('App');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  console.log('app user', user);

  useEffect(() => {
    dispatch(userThunks.auth());
  }, []);

  return (
    <div className='container p-2'>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignupPage} />
          <Route path='/form' component={CameraFormPage} />
          <Route path='/camera/:id' component={CameraPage} />
          <Route exact path='/' component={CameraListPage} />
          <Redirect to='/' />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
