import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Breadcrumbs = ({ stack, style }) => {
  return (
    <Breadcrumb style={style}>
      {stack.map((folder) => (
        <Breadcrumb.Item href='#' key={folder._id}>
          {folder.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
