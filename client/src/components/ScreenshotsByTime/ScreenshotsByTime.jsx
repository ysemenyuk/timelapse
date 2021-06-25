import React, { useEffect, useState } from 'react';

import cameraRepository from '../../api/camera.repository.js';

import Status from './Status.jsx';
import Settings from './Settings.jsx';

const ScreenshotsByTime = ({ selectedCamera }) => {
  // const dispatch = useDispatch();

  const [screenshotsData, setScreenshotsData] = useState(null);

  useEffect(async () => {
    const { data } = await cameraRepository.getTaskScreenshotByTime(selectedCamera._id);
    console.log(data);
    setScreenshotsData(data);
  }, []);

  const getOneScreenshot = async (e) => {
    const { data } = await cameraRepository.getScreenshot(selectedCamera._id);
    console.log(data);
  };

  if (!selectedCamera || !screenshotsData) {
    return null;
  }

  return (
    <div className='col-12 mb-4'>
      <h6 className='mb-3'>Get screenshots by time</h6>
      <Status screenshotsData={screenshotsData} />
      <Settings screenshotsData={screenshotsData} onGetOneScreenshot={getOneScreenshot} />
    </div>
  );
};

export default ScreenshotsByTime;