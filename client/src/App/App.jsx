import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import userThunks from '../thunks/userThunks.js';

import Navbar from '../components/Navbar/Navbar.jsx';
import Spinner from '../components/Spinner.jsx';
// import Error from './components/Error.jsx';

import LoginPage from '../pages/LoginPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';

import CameraListPage from '../pages/CamerasListPage.jsx';
import CameraPage from '../pages/OneCameraPage.jsx';
import CameraAddPage from '../pages/AddCameraPage.jsx';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // console.log('app user', user);

  useEffect(() => {
    user.tokenVerification && dispatch(userThunks.tokenVerification());
  }, []);

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route {...rest} render={() => (user.isLoggedIn ? children : <Redirect to={'/login'} />)} />
    );
  };

  return (
    <div className='container p-2'>
      {user.tokenVerification ? (
        <Spinner />
      ) : (
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/signup' component={SignupPage} />
            <PrivateRoute>
              <Route exact path='/user' component={ProfilePage} />
              <Route exact path='/form' component={CameraAddPage} />
              <Route exact path='/cameras/:id' component={CameraPage} />
              <Route exact path={['/', '/cameras']} component={CameraListPage} />
            </PrivateRoute>
            <Redirect to='/' />
          </Switch>
        </Router>
      )}
    </div>
  );
};

export default App;
