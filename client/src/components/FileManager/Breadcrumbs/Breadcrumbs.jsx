import React from 'react';
import { Breadcrumb } from 'antd';

import './breadcrumbs.css';

const Breadcrumbs = ({ stack }) => {
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      {stack.map((folder) => (
        <Breadcrumb.Item key={folder._id}>
          <a href='#'>{folder.name}</a>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
