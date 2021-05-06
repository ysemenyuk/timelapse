import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { camerasActions, formActions } from '../store/index.js';

const Sidebar = () => {
  const dispatch = useDispatch();
  const cameras = useSelector((state) => state.cameras.allItems);
  const selectedCamera = useSelector((state) => state.cameras.selectedItem);
  const formType = useSelector((state) => state.form.type);

  console.log('Sidebar cameras', cameras);

  const handleAddItem = (e) => {
    e.preventDefault();
    dispatch(formActions.setType('add'));
    dispatch(camerasActions.selectItem(null));
  };

  const handleSelectItem = (item) => () => {
    dispatch(camerasActions.selectItem(item));
    if (formType !== 'read') {
      dispatch(formActions.setType('read'));
    }
  };

  return (
    <>
      <div className='mb-3'>Sidebar</div>
      <div className='list-group mb-3'>
        {cameras.length
          ? cameras.map((camera) => {
              const activeClass = selectedCamera?.id === camera.id && 'active';
              return (
                <button
                  onClick={handleSelectItem(camera)}
                  key={camera.id}
                  type='button'
                  className={`list-group-item list-group-item-action ${activeClass}`}
                  aria-current='true'
                >
                  {camera.name}
                </button>
              );
            })
          : null}
      </div>
      <div className='d-grid gap-2'>
        <button
          className='btn btn-primary'
          type='button'
          onClick={handleAddItem}
        >
          Add New Camera
        </button>
      </div>
    </>
  );
};

export default Sidebar;
