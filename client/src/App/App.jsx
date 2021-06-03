import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import userThunks from '../thunks/userThunks.js';

import Navbar from '../components/Navbar.jsx';
import Spinner from '../components/Spinner.jsx';
// import Error from './components/Error.jsx';

import LoginPage from '../pages/LoginPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';
import UserProfilePage from '../pages/UserProfilePage.jsx';

import CameraListPage from '../pages/CameraListPage.jsx';
import CameraPage from '../pages/CameraPage.jsx';
import CameraAddPage from '../pages/CameraAddPage.jsx';

const App = () => {
  // console.log('App');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // console.log('app user', user);

  useEffect(() => {
    user.isLoggedIn === 'checkToken' && dispatch(userThunks.auth());
  }, []);

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route {...rest} render={() => (user.isLoggedIn ? children : <Redirect to={'/login'} />)} />
    );
  };

  return (
    <div className='container p-2'>
      {user.isLoggedIn === 'checkToken' ? (
        <Spinner />
      ) : (
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/signup' component={SignupPage} />
            <PrivateRoute>
              <Route exact path='/user' component={UserProfilePage} />
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
