import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { camerasActions, formActions } from '../store/index.js';
import apiRoutes from '../apiRoutes.js';

const useFormType = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);
  const selectedCamera = useSelector((state) => state.cameras.selectedItem);

  console.log(123, selectedCamera);

  if (form.type === 'edit') {
    return {
      cameraAction: camerasActions.updateOne,
      formAction: formActions.set,
      method: 'PUT',
      url: apiRoutes.cameraPath(selectedCamera._id),
    };
  }

  return {
    cameraAction: camerasActions.addOne,
    formAction: formActions.set,
    method: 'POST',
    url: apiRoutes.cameras(),
  };
};

export default useFormType;
