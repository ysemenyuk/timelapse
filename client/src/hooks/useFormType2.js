import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { camerasActions, formActions } from '../store/index.js';
import apiRoutes from '../apiRoutes.js';

const useFormType = (selectedCamera) => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);
  // const selectedCamera = useSelector((state) => state.cameras.selectedItem);

  // console.log(123, selectedCamera);

  const handleCreate = async (
    values,
    { setSubmitting, resetForm, setFieldError }
  ) => {
    try {
      const { data } = await axios.post(apiRoutes.cameras(), values);
      resetForm();
      setSubmitting(false);
      console.log('form onSubmit addOne resp data -', data);
      dispatch(camerasActions.addOne(data));
      dispatch(formActions.set({ show: false, type: null }));
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
        apiRoutes.cameraPath(selectedCamera._id),
        values
      );
      resetForm();
      setSubmitting(false);
      console.log('form onSubmit updateOne resp data -', data);
      dispatch(camerasActions.updateOne(data));
      dispatch(formActions.set({ show: false, type: null }));
    } catch (err) {
      setSubmitting(false);
      setFieldError('networkError', 'networkError');
      console.log('catch err -', err);
    }
  };

  if (form.type === 'edit') {
    return {
      onSubmit: handleUpdate,
    };
  }

  return {
    onSubmit: handleCreate,
  };
};

export default useFormType;
