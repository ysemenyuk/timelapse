import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';

const CameraInfo = ({ selectedCamera, onDelete, onEdit }) => {
  console.log('Main Info selectedCamera -', selectedCamera);

  if (selectedCamera === null) {
    return null;
  }

  return (
    <div className='mb-3'>
      <div className='mb-3'>Selected Camera Info</div>
      <div>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Key</th>
              <th scope='col'>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(selectedCamera).map(([key, value], index) => {
              return (
                <tr key={key}>
                  <th scope='row'>{index}</th>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='d-grid gap-2 d-flex justify-content-start'>
        <button className='btn btn-primary' onClick={onDelete}>
          Delete
        </button>
        <button className='btn btn-primary' onClick={onEdit}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default CameraInfo;
