import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './ImgWrapper.module.css';

export default ({ src, width, height, ...props }) => {
  const [load, setLoad] = useState(false);

  const wd = `${width}%`;
  const pd = `${width * height}%`;

  useEffect(() => {
    setLoad(false);
  }, [src]);

  return (
    <div style={{ width: wd, paddingBottom: pd, position: 'relative' }}>
      <div className={styles.wrapper}>
        <img onLoad={() => setLoad(true)} src={src} {...props} />
        {!load && (
          <span>
            <Spinner animation='border' />
          </span>
        )}
      </div>
    </div>
  );
};
