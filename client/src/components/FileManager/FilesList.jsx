import React from 'react';

const FilesList = ({ files, onClickFile }) => {
  if (files.length === 0) {
    return null;
  }

  return files.map((file, index) => (
    <div
      key={file._id}
      className='m-3 col-2'
      display='block'
      role='button'
      onClick={() => onClickFile(index)}
    >
      <img
        src={`/files/${file.preview}`}
        width='190px'
        height='107px'
        className='img-thumbnail'
        // data-bs-toggle='modal'
        // data-bs-target='#exampleModal'
      />
      <div>{file.date}</div>
    </div>
  ));
};

export default FilesList;
