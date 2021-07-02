import React, { useState, useEffect } from 'react';
// import styles from './imgWrapper.less';
import './index.css';

import { Row, Col, Button, Space, Typography, Alert, Spin } from 'antd';
const { Title } = Typography;

export default ({ src, desc, style }) => {
  const [load, setLoad] = useState(false);

  // console.log(111, styles);
  useEffect(() => {
    setLoad(false);
  }, [src]);

  return (
    <>
      <Spin spinning={!load}>
        <div style={style} className='imageWrapper'>
          <img onLoad={() => setLoad(true)} className='img' src={src} alt={desc} />
        </div>
      </Spin>
    </>
  );
};
