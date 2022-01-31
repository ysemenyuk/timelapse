import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import { fileManagerActions } from '../../store/fileManagerSlice.js';

function ImgViewerModal({ onHide, show, files, onDeletFile }) {
  const dispatch = useDispatch();

  const { currentFileIndex } = useSelector((state) => state.fileManager);

  if (currentFileIndex === null || !show || !files) {
    return null;
  }

  const currentFile = files[currentFileIndex];

  const nextImgBtnDisabled = currentFileIndex === files.length - 1;
  const prewImgBtnDisabled = currentFileIndex === 0;

  const nextImageHandler = () => {
    dispatch(fileManagerActions.nextFile());
  };

  const prewImageHandler = () => {
    dispatch(fileManagerActions.prewFile());
  };

  const deletFileHandler = () => {
    onDeletFile(currentFile);
  };

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      show={show}
      onHide={onHide}
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
        <Button key="delete" onClick={deletFileHandler}>
          Delete
        </Button>
        <Button key="close" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImgViewerModal;
