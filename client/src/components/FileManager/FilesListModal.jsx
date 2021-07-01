import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';

const FilesListModal = ({ files, fileIndex, onCloseModal, onNextFile, onPrewFile, setModal }) => {
  const exampleModal = useRef();

  useEffect(() => {
    setModal(new Modal(exampleModal.current));
  }, []);

  return (
    <div
      className='modal hide'
      ref={exampleModal}
      id='exampleModal'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-xl'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Modal title
            </h5>
            <button type='button' className='btn-close' onClick={onCloseModal}></button>
          </div>
          <div className='modal-body'>
            <img
              loading='lazy'
              className='img-fluid'
              src={`/files/${files[fileIndex]?.original}`}
            />
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-primary' onClick={onPrewFile}>
              Prew
            </button>
            <button type='button' className='btn btn-primary' onClick={onNextFile}>
              Next
            </button>
            <button type='button' className='btn btn-secondary' onClick={onCloseModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesListModal;
