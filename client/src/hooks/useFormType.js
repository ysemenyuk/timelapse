import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { formActions } from '../store/formSlice.js';
import cameraThunks from '../thunks/cameraThunks.js';
import apiRoutes from '../apiRoutes.js';

const useFormType = (selectedCamera) => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);

  // console.log('useFormType selectedCamera', selectedCamera);

  const handleCreate = async (
    values,
    { setSubmitting, resetForm, setFieldError }
  ) => {
    try {
      const { data } = await axios.post(apiRoutes.cameras(), values);
      resetForm();
      setSubmitting(false);
      console.log('form onSubmit addOne resp data -', data);
      dispatch(cameraThunks.addOne(data));
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
      dispatch(cameraThunks.updateOne(data));
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
