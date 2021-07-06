import React, { useState, useEffect, useRef } from 'react';
import './ImgWrapper.css';

import { Spin } from 'antd';

export default ({ src, width, height, wrapperStyle, imgStyle, ...props }) => {
  const [load, setLoad] = useState(false);

  const wd = `${width}%`;
  const pd = `${width * height}%`;

  useEffect(() => {
    setLoad(false);
  }, [src]);

  return (
    <div style={{ width: wd, paddingBottom: pd, position: 'relative' }}>
      <div className='imageWrapper' style={wrapperStyle}>
        <Spin spinning={!load}>
          <img
            onLoad={() => setLoad(true)}
            className='imageWrapper-img'
            style={imgStyle}
            src={src}
            {...props}
          />
        </Spin>
      </div>
    </div>
  );
};
