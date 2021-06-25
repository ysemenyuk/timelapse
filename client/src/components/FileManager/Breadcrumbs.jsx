import React from 'react';

const Breadcrumbs = ({ stack }) => {
  return (
    <div className='mb-3'>
      <span>Home /</span>
      {stack.map((folder) => (
        <span key={folder._id}>{` ${folder.name} /`}</span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
