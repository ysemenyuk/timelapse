import React from 'react';

const FilesList = ({ files, onClickFile }) => {
  if (files.length === 0) {
    return null;
  }

  return files.map((file) => (
    <div
      key={file._id}
      className='m-3 col-2'
      display='block'
      role='button'
      onClick={() => onClickFile(file)}>
      <img src={`/files/${file.preview}`} width='190px' height='107px' className='img-thumbnail' />
      <div>{file.date}</div>
    </div>
  ));
};

export default FilesList;
