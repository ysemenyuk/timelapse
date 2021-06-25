import React from 'react';

const FilesListItem = ({ name, icon }) => {
  return (
    <div className='m-3 col-2' display='block' role='button'>
      <img src={`/files/${icon}`} width='190px' height='107px' className='img-thumbnail' />
      <div>{name}</div>
    </div>
  );
};

export default FilesListItem;
