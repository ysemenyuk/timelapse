import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import { fileManagerActions } from '../../store/fileManagerSlice.js';

function ImgViewer({ selectedCamera, onCloseImgViewer, visible }) {
  const dispatch = useDispatch();

  const { parent, files, currentFileIndex } = useSelector((state) => state.fileManager);

  if (currentFileIndex === null || !visible || !parent) {
    return null;
  }

  const parentId = parent[selectedCamera._id]._id;
  const currentFile = files[parentId][currentFileIndex];

  const nextImgBtnDisabled = currentFileIndex === files[parentId].length - 1;
  const prewImgBtnDisabled = currentFileIndex === 0;

  const nextImageHandler = () => {
    dispatch(fileManagerActions.nextFileIndex());
  };

  const prewImageHandler = () => {
    dispatch(fileManagerActions.prewFileIndex());
  };

  const deleteImageHandler = () => {
    // console.log('delete', currentFile);
    dispatch(
      fileManagerActions.deleteOneFile({
        cameraId: selectedCamera._id,
        fileId: currentFile._id,
      }),
    );
  };

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      show={visible}
      onHide={onCloseImgViewer}
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{currentFile?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ImgWrapper width={100} height={0.5625} src={`/files/${currentFile?.name}`} />
      </Modal.Body>
      <Modal.Footer>
        <Button key="prew" onClick={prewImageHandler} disabled={prewImgBtnDisabled}>
          PrewItem
        </Button>
        <Button key="next" onClick={nextImageHandler} disabled={nextImgBtnDisabled}>
          NextItem
        </Button>
        <Button key="delete" onClick={deleteImageHandler}>
          Delete
        </Button>
        <Button key="close" onClick={onCloseImgViewer}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImgViewer;
