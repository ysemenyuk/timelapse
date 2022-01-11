import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import userThunks from '../thunks/userThunks.js';
import Navbar from '../components/Navbar/Navbar.jsx';
import Spinner from '../components/UI/Spinner.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import CameraListPage from '../pages/CamerasListPage.jsx';
import CameraPage from '../pages/OneCameraPage.jsx';
import CameraAddPage from '../pages/AddCameraPage.jsx';
import { Container } from 'react-bootstrap';

const PrivateRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isAuth = user.isLoggedIn && userInfo && userInfo.token;
  return <Route {...rest} render={() => (isAuth ? children : <Redirect to={'/login'} />)} />;
};

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    user.tokenVerification && dispatch(userThunks.tokenVerification());
  }, []);

  return (
    <Container>
      <Choose>
        <When condition={user.tokenVerification}>
          <Spinner />
        </When>
        <Otherwise>
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
        </Otherwise>
      </Choose>
    </Container>
  );
};

export default App;
