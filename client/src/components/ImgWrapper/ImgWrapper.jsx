import React, { useState, useEffect, useRef } from 'react';
import './index.css';

import { Spin } from 'antd';

export default ({ src, width, height, style, ...props }) => {
  const [load, setLoad] = useState(false);

  const wd = `${width}%`;
  const pd = `${width * (height / 100)}%`;

  useEffect(() => {
    setLoad(false);
  }, [src]);

  return (
    <>
      <div style={{ width: wd, paddingBottom: pd, position: 'relative' }}>
        <div
          style={style}
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          className='imageWrapper'>
          <Spin spinning={!load}>
            <img onLoad={() => setLoad(true)} className='imageWrapper-img' src={src} {...props} />
          </Spin>
        </div>
      </div>
    </>
  );
};
