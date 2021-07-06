import React from 'react';
import { Row, Col, Button, Space, Typography, Image, Spin } from 'antd';
const { Title, Text } = Typography;

import ImgWrapper from '../../ImgWrapper/ImgWrapper.jsx';

const FoldersList = ({ folders, onClickFolder }) => {
  if (folders.length === 0) {
    return null;
  }

  return folders.map((folder) => (
    <Col span={3} key={folder._id}>
      <ImgWrapper
        width={100}
        height={1}
        src={`/assets/folder-img.png`}
        role='button'
        onClick={() => onClickFolder(folder)}
      />
      <Text>{folder.name}</Text>
    </Col>
  ));
};

export default FoldersList;
