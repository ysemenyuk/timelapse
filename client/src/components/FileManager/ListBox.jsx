import React from 'react';

const ListBox = ({ children }) => {
  return (
    <div className='vh-100 d-flex flex-wrap align-content-start border rounded overflow-auto'>
      {children}
    </div>
  );
};

export default ListBox;
