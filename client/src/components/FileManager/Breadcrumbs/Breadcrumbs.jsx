import React from 'react';
import { Breadcrumb } from 'antd';

const Breadcrumbs = ({ stack, style }) => {
  return (
    <Breadcrumb style={style}>
      {/* <Breadcrumb.Item>Home</Breadcrumb.Item> */}
      {stack.map((folder) => (
        <Breadcrumb.Item key={folder._id}>
          <a href='#'>{folder.name}</a>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
