import React, { useContext } from 'react';
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

const App = () => {
  console.log('App');
  return (
    <div className='container p-2'>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignupPage} />
          <Route path='/camera/:id' component={CameraPage} />
          <Route path='/' component={CameraListPage} />
          <Redirect to='/' />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
