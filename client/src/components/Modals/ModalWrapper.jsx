import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from '../../store/modalSlice';
import { ADD_CAMERA, EDIT_CAMERA, EDIT_SCREENSHOT_SETTINGS, IMAGE_VIEWER } from '../../utils/constants.js';
import EditCameraModal from './EditCameraModal.jsx';
import AddCameraModal from './AddCameraModal.jsx';
import ImgViewerModal from './ImgViewerModal.jsx';
import EditScreenshotsSettingsModal from './EditScreenshotsSettingsModal.jsx';

const modals = {
  [EDIT_CAMERA]: EditCameraModal,
  [ADD_CAMERA]: AddCameraModal,
  [IMAGE_VIEWER]: ImgViewerModal,
  [EDIT_SCREENSHOT_SETTINGS]: EditScreenshotsSettingsModal,
};

function ModalWrapper() {
  const dispatch = useDispatch();

  const { show, type, data } = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };

  if (!show) {
    return null;
  }

  const Modal = modals[type];

  return (
    <Modal show={show} onHide={handleClose} data={data} />
  );
}

export default ModalWrapper;
