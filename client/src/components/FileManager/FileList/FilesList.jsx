import React from 'react';

import ImgWrapper from '../../UI/ImgWrapper/ImgWrapper.jsx';

const FilesList = ({ className, files, onClickFile }) => {
  if (!files || !files.length) {
    return null;
  }

  return files.map((file, index) => (
    <div className={className} key={file._id}>
      <ImgWrapper
        width={100}
        height={0.5625}
        src={`/files/${file.name}?size=thumbnail`}
        role='button'
        onClick={() => onClickFile(index)}
      />
      <span>{file.date}</span>
    </div>
  ));
};

export default FilesList;
