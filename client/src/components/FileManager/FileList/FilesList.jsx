import React from 'react';
import { Row, Col, Button, Space, Typography, Image, Spin } from 'antd';
const { Title, Text } = Typography;

const FilesList = ({ files, onClickFile }) => {
  if (files.length === 0) {
    return null;
  }

  return files.map((file, index) => (
    <Col span={4} key={file._id}>
      <Image
        src={`/files/${file.name}?size=thumbnail`}
        preview={false}
        role='button'
        onClick={() => onClickFile(index)}
        // preview={{
        //   src: `/files/${file.original}`,
        // }}
        placeholder={<Spin />}
      />
      <Text>{file.date}</Text>
    </Col>
  ));
};

export default FilesList;
