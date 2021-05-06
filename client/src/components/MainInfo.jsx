import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import CameraInfo from './CameraInfo.jsx';
import CameraForm from './CameraForm.jsx';

import { camerasActions, formActions } from '../store/index.js';
import apiRoutes from '../apiRoutes.js';

const MainInfo = () => {
  const dispatch = useDispatch();
  const selectedCamera = useSelector((state) => state.cameras.selectedItem);
  const formType = useSelector((state) => state.form.type);

  console.log('MainInfo camera -', selectedCamera);
  console.log('MainInfo formType -', formType);

  const handleCreate = async (
    values,
    { setSubmitting, resetForm, setFieldError }
  ) => {
    try {
      const { data } = await axios.post(apiRoutes.cameras(), values);
      resetForm();
      setSubmitting(false);
      console.log('form onSubmit resp data -', data);
      dispatch(camerasActions.addOne(data));
      dispatch(formActions.setType('read'));
    } catch (err) {
      setSubmitting(false);
      setFieldError('networkError', 'networkError');
      console.log('catch err -', err);
    }
  };

  const handleUpdate = async (
    values,
    { setSubmitting, resetForm, setFieldError }
  ) => {
    try {
      const { data } = await axios.put(
        apiRoutes.cameraPath(selectedCamera.id),
        values
      );
      resetForm();
      setSubmitting(false);
      console.log('form onSubmit resp data -', data);
      dispatch(camerasActions.updateOne(data));
      dispatch(formActions.setType('read'));
    } catch (err) {
      setSubmitting(false);
      setFieldError('networkError', 'networkError');
      console.log('catch err -', err);
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        apiRoutes.cameraPath(selectedCamera.id)
      );
      console.log('form onSubmit resp data -', data);
      dispatch(camerasActions.deleteOne(selectedCamera));
    } catch (err) {
      console.log('catch err -', err);
    }
  };

  const handleEdit = () => {
    dispatch(formActions.setType('edit'));
  };

  if (selectedCamera === null || formType === 'add') {
    return <CameraForm selectedCamera={null} onSubmit={handleCreate} />;
  }

  if (formType === 'edit') {
    return (
      <CameraForm selectedCamera={selectedCamera} onSubmit={handleUpdate} />
    );
  }

  if (formType === 'read') {
    return (
      <CameraInfo
        selectedCamera={selectedCamera}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );
  }
};

export default MainInfo;
