import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { camerasActions, formActions } from '../store/index.js';

const CameraSidebar = () => {
  const dispatch = useDispatch();
  const cameras = useSelector((state) => state.cameras.allItems);
  const selectedCamera = useSelector((state) => state.cameras.selectedItem);
  const form = useSelector((state) => state.form);

  console.log('Sidebar cameras', cameras);

  const handleAddItem = () => {
    dispatch(formActions.set({ show: true, type: 'add' }));
    dispatch(camerasActions.selectItem(null));
  };

  const handleSelectItem = (item) => () => {
    dispatch(camerasActions.selectItem(item));
    if (form.show) {
      dispatch(formActions.set({ show: false, type: null }));
    }
  };

  return (
    <>
      <div className='mb-3'>Sidebar</div>
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
                  {camera.name}
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

export default CameraSidebar;
