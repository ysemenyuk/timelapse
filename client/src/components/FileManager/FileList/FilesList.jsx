import React from 'react';
import { Col, Typography } from 'antd';
const { Text } = Typography;

import ImgWrapper from '../../ImgWrapper/ImgWrapper.jsx';

const FilesList = ({ files, onClickFile }) => {
  if (!files || !files.length) {
    return null;
  }

  return files.map((file, index) => (
    <Col span={4} key={file._id}>
      <ImgWrapper
        width={100}
        height={0.5625}
        src={`/files/${file.name}?size=thumbnail`}
        role='button'
        onClick={() => onClickFile(index)}
      />
      <Text>{file.date}</Text>
    </Col>
  ));
};

export default FilesList;
