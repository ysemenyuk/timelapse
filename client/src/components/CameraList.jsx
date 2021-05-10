import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { cameraActions } from '../store/cameraSlice.js';
import { formActions } from '../store/formSlice.js';

const CameraList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cameras = useSelector((state) => state.camera.allItems);
  const selectedCamera = useSelector((state) => state.camera.selectedItem);
  const form = useSelector((state) => state.form);

  // console.log('CameraList cameras', cameras);

  const handleAddItem = () => {
    dispatch(formActions.set({ show: true, type: 'add' }));
    dispatch(cameraActions.selectItem(null));
  };

  const handleSelectItem = (item) => () => {
    dispatch(cameraActions.selectItem(item));
    if (form.show) {
      dispatch(formActions.set({ show: false, type: null }));
    }
  };

  return (
    <>
      <h6 className='mb-3'>List</h6>
      {cameras.length ? (
        <>
          <div className='list-group mb-3'>
            {cameras.map((camera) => {
              const activeClass =
                selectedCamera?._id === camera._id && 'active';
              return (
                <button
                  onClick={handleSelectItem(camera)}
                  key={camera._id}
                  type='button'
                  className={`list-group-item list-group-item-action ${activeClass}`}
                  aria-current='true'
                >
                  <div className='fw-bold'>{camera.name}</div>
                  <small>{camera.description}</small>
                </button>
              );
            })}
          </div>
          <div>
            <button
              className='btn btn-primary'
              type='button'
              onClick={handleAddItem}
            >
              Add New Camera
            </button>
          </div>
        </>
      ) : (
        <div>No cameras.</div>
      )}
    </>
  );
};

export default CameraList;
