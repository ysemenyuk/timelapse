import { useSelector } from 'react-redux';

import apiRoutes from '../apiRoutes.js';

const useFormState = () => {
  const formType = useSelector((state) => state.form.type);
  const selectedCamera = useSelector((state) => state.cameras.selectedItem);

  console.log(111, selectedCamera);

  const cameraValues = {
    name: selectedCamera?.name || '',
    description: selectedCamera?.description || '',
    rtspLink: selectedCamera?.rtspLink || '',
    jpegLink: selectedCamera?.jpegLink || '',
    jpegCreateInterval: '',
    jpegCreateStartTime: '',
    jpegCreateStopTime: '',
  };

  if (formType === 'read') {
    return {
      readOnly: true,
      editButton: true,
      deleteButton: true,
      submitButton: false,
      values: cameraValues,
      onSubmit: () => {},
    };
  }

  if (formType === 'edit') {
    return {
      readOnly: false,
      editButton: false,
      deleteButton: false,
      submitButton: true,
      values: cameraValues,
      onSubmit: (dispatch) => async (
        values,
        { setSubmitting, resetForm, setFieldError }
      ) => {
        try {
          const { data } = await axios.put(
            apiRoutes.camera(selectedCamera.id),
            values
          );
          resetForm();
          setSubmitting(false);
          console.log('form onSubmit resp data -', data);
          // dispatch(camerasActions.addOne(data));
        } catch (err) {
          setSubmitting(false);
          setFieldError('networkError', 'networkError');
          console.log('catch err -', err);
        }
      },
    };
  }

  if (formType === 'delete') {
    return {
      readOnly: true,
      editButton: false,
      deleteButton: false,
      submitButton: true,
      values: cameraValues,
      onSubmit: (dispatch) => async (
        values,
        { setSubmitting, resetForm, setFieldError }
      ) => {
        try {
          const { data } = await axios.delete(
            apiRoutes.camera(selectedCamera.id)
          );
          resetForm();
          setSubmitting(false);
          console.log('form onSubmit resp data -', data);
          // dispatch(camerasActions.addOne(data));
        } catch (err) {
          setSubmitting(false);
          setFieldError('networkError', 'networkError');
          console.log('catch err -', err);
        }
      },
    };
  }

  if (formType === 'add') {
    return {
      readOnly: false,
      editButton: false,
      deleteButton: false,
      submitButton: true,
      values: {
        name: '',
        description: '',
        rtspLink: '',
        jpegLink: '',
        jpegCreateInterval: '',
        jpegCreateStartTime: '',
        jpegCreateStopTime: '',
      },
      onSubmit: (dispatch) => async (
        values,
        { setSubmitting, resetForm, setFieldError }
      ) => {
        try {
          const { data } = await axios.post(apiRoutes.cameras(), values);
          resetForm();
          setSubmitting(false);
          console.log('form onSubmit resp data -', data);
          dispatch(camerasActions.addOne(data));
        } catch (err) {
          setSubmitting(false);
          setFieldError('networkError', 'networkError');
          console.log('catch err -', err);
        }
      },
    };
  }

  return {};
};

export default useFormState;
