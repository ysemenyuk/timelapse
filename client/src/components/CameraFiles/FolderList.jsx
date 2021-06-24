import React from 'react';

const dirLogo = '/files/assets/folder-img.png';
const fileLogo = '/files/assets/file-img.png';

const FolderList = ({ folders, onClickFolder }) => {
  if (folders.length === 0) {
    return null;
  }

  return folders.map((folder) => (
    <div
      key={folder._id}
      className='m-3 col-2'
      display='block'
      role='button'
      onClick={() => onClickFolder(folder)}
    >
      <img src={`/files/no_img.jpg`} width='190px' height='107px' className='img-thumbnail' />
      <div>{folder.name}</div>
    </div>
  ));
};

export default FolderList;
