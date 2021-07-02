import React from 'react';
import { Row, Col, Button, Space, Typography, Image, Spin } from 'antd';
const { Title, Text } = Typography;

const FoldersList = ({ folders, onClickFolder }) => {
  if (folders.length === 0) {
    return null;
  }

  return folders.map((folder) => (
    <Col span={3} key={folder._id}>
      <Image
        src={`/assets/folder-img.png`}
        role='button'
        onClick={() => onClickFolder(folder)}
        preview={false}
        placeholder={<Spin />}
      />
      <Text>{folder.name}</Text>
    </Col>
  ));
};

export default FoldersList;
