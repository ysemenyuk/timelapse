import React from 'react';

const Error = (props) => {
  return (
    <div>
      <span>{props.message || 'Network error.'}</span>
    </div>
  );
};

export default Error;
