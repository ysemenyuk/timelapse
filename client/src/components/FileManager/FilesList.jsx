import React from 'react';
import { Image, Spin } from 'antd';

const FilesList = ({ files, onClickFile }) => {
  if (files.length === 0) {
    return null;
  }

  return (
    <Image.PreviewGroup>
      {files.map((file, index) => (
        <div
          key={file._id}
          className='m-3 col-2'
          display='block'
          role='button'
          onClick={() => onClickFile(index)}>
          <Image
            // width={'100%'}
            src={`/files/${file.preview}`}
            preview={false}
            // preview={{
            //   src: `/files/${file.original}`,
            // }}
            placeholder={<Spin />}
          />
          <div>{file.date}</div>
        </div>
      ))}
    </Image.PreviewGroup>
  );
};

export default FilesList;
