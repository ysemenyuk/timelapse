import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import cameraThunks from '../thunks/cameraThunks.js';
import useThunkStatus from './useThunkStatus.js';

export default function () {
  const dispatch = useDispatch();

  const { isLoading, isSuccess, isError } = useThunkStatus(cameraThunks.fetchAll);
  const cameras = useSelector((state) => state.camera.allCameras);

  useEffect(() => {
    if (cameras.length === 0) {
      dispatch(cameraThunks.fetchAll());
    }
  }, []);

  return { cameras, isLoading, isSuccess, isError };
}
