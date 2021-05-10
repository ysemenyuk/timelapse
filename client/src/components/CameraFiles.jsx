import React from 'react';
import './camera.css';

const CameraFiles = () => {
  const imgsArray = new Array(50).fill(null).map((i, index) => ({
    id: index + 100,
    name: `img--2021-05-09--10-${index}`,
  }));

  return (
    <div>
      <h6 className='mb-3'>Camera dirs and files</h6>
      <div className='files_container overflow-auto'>
        {imgsArray.map((i) => (
          <div key={i.id} className='file_plate col-2'>
            <img
              src='/api/assets/no_image.png'
              className='file_plate_img img-thumbnail'
            />
            <div className='file_plate_name'>{i.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraFiles;
