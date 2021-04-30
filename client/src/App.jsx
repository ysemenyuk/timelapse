import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const [cameras, setCameras] = useState(null);

  useEffect(() => {
    axios.get('/api')
    .then(resp => console.log(1, resp));
  }, [])

  useEffect(() => {
    axios.get('/api/cameras')
    .then(resp => {
      console.log(2, resp);
      setCameras(resp.data);
    });
  }, [])

  console.log(3, cameras);

  return (
    <div className="App">
      {cameras 
      ? `Cameras -- ${JSON.stringify(cameras)}`
      : 'Loading..'} 
    </div>
  );
}

export default App;
