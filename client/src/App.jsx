import React from 'react';

import Navbar from './components/Navbar.jsx';
import CameraListPage from './pages/CameraListPage.jsx';

const App = () => {
  console.log('App');

  return (
    <div className='container p-2'>
      <Navbar />
      <CameraListPage />
    </div>
  );
};

export default App;
