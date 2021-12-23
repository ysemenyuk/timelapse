import sharp from 'sharp';

const resize = (size) => {
  return sharp().resize(size);
};

export default { resize };
