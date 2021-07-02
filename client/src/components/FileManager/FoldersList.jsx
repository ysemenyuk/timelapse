import React from 'react';
import { Image, Spin } from 'antd';

const FoldersList = ({ folders, onClickFolder }) => {
  if (folders.length === 0) {
    return null;
  }

  return folders.map((folder) => (
    <div
      key={folder._id}
      className='m-3 col-2'
      display='block'
      role='button'
      onClick={() => onClickFolder(folder)}>
      <Image src={`/files/no_img.jpg`} preview={false} placeholder={<Spin />} />
      <div>{folder.name}</div>
    </div>
  ));
};

export default FoldersList;
