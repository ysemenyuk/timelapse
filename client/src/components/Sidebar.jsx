import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { camerasActions } from '../store/index.js';

const Sidebar = () => {
  const dispatch = useDispatch();
  const cameras = useSelector(state => state.cameras.allItems)
  const selectedCamera = useSelector(state => state.cameras.selectedCamera)

  console.log('Sidebar cameras', cameras);

  const handleSelectItem = (item) => () => {
    dispatch(camerasActions.selectItem(item));
  };

  return (
    <>
    <div className="mb-3">Sidebar</div>
    <div className="list-group mb-3">
      {cameras.length ? cameras.map((camera) => {
        const activeClass = selectedCamera.id === camera.id && 'active';
        return (
          <button 
            onClick={handleSelectItem(camera)}
            key={camera.id}
            type="button"
            className={`list-group-item list-group-item-action ${activeClass}`}
            aria-current="true"
          >
            {camera.name}
          </button>
        )
      }) : null}
    </div>
    <div className="d-grid gap-2">
      <button className="btn btn-primary" type="button">Add new camera</button>
    </div>
    </>
  );
};

export default Sidebar;