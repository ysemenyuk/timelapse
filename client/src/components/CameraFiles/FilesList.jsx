import React from 'react';

const dirLogo = '/files/assets/folder-img.png';
const fileLogo = '/files/assets/file-img.png';

const FilesList = ({ files, onClickFile }) => {
  if (files?.length === 0) {
    return <div>No files.</div>;
  }

  return files.map((file) => (
    <div
      key={file._id}
      className='m-3'
      display='block'
      role='button'
      onClick={() => onClickFile(file)}
    >
      <img
        src={file.type === 'dir' ? dirLogo : fileLogo}
        width='60px'
        height='60px'
        className='img-thumbnail'
      />
      <div>{file.name}</div>
    </div>
  ));
};

export default FilesList;
