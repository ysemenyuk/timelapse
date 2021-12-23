import React from 'react';

const List = ({ cameras, selectedCamera, onSelectItem }) => {
  if (cameras.length === 0) {
    return <div>No cameras.</div>;
  }

  return cameras.map((camera) => {
    const activeClass = selectedCamera?._id === camera._id ? 'active' : '';
    return (
      <button
        onClick={onSelectItem(camera)}
        key={camera._id}
        type='button'
        className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start ${activeClass}`}
        aria-current='true'
      >
        <div className='ms-2'>
          <div className='fw-bold'>{camera.name}</div>
          <div className='small'>{camera.description}</div>
        </div>
        <span className='badge bg-success'>online</span>
      </button>
    );
  });
};

export default List;
