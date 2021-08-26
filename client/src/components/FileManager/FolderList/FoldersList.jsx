import React from 'react';
import folderImg from '../../../assets/folder.png';
import ImgWrapper from '../../UI/ImgWrapper/ImgWrapper.jsx';

const FoldersList = ({ className, folders, onClickFolder }) => {
  if (!folders || !folders.length) {
    return null;
  }

  return folders.map((folder) => (
    <div className={className} key={folder._id}>
      <ImgWrapper
        width={100}
        height={0.5625}
        src={folderImg}
        role='button'
        onClick={() => onClickFolder(folder)}
      />
      <span>{folder.name}</span>
    </div>
  ));
};

export default FoldersList;
