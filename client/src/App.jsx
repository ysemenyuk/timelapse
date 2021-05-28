import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
// import Spinner from './components/Spinner.jsx';
// import Error from './components/Error.jsx';

import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import CameraListPage from './pages/CameraListPage.jsx';
import CameraPage from './pages/CameraPage.jsx';
import CameraAddPage from './pages/CameraAddPage.jsx';

const App = () => {
  // console.log('App');
  const user = useSelector((state) => state.user);

  console.log('app user', user);

  return (
    <div className='container p-2'>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/signup' component={SignupPage} />
          <Route exact path='/form' component={CameraAddPage} />
          <Route exact path='/camera/:id' component={CameraPage} />
          <Route exact path='/' component={CameraListPage} />
          <Redirect to='/' />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
