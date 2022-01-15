import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './ImgWrapper.module.css';

export default ({ src, width, height, ...props }) => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);

  const wd = `${width}%`;
  const pd = `${width * height}%`;

  useEffect(() => {
    setLoad(false);
    setError(false);
  }, [src]);

  return (
    <div style={{ width: wd, paddingBottom: pd, position: 'relative' }}>
      <div className={styles.wrapper}>
        <Choose>
          <When condition={!error}>
            <img
              onLoad={() => {
                setLoad(true);
                setError(false);
              }}
              onError={() => {
                setLoad(true);
                setError(true);
              }}
              src={src}
              {...props}
            />
          </When>
          <Otherwise>
            <img src={`/assets/no_img.png`} {...props} />
          </Otherwise>
        </Choose>

        <If condition={!load}>
          <span>
            <Spinner animation='border' />
          </span>
        </If>
      </div>
    </div>
  );
};
