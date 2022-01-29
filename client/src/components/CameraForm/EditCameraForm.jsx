import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Col, Form, Button, Spinner, InputGroup } from 'react-bootstrap';
import { formActions } from '../../store/formSlice.js';
import cameraThunks from '../../thunks/cameraThunks.js';
import Heading from '../UI/Heading.jsx';
import Error from '../UI/Error.jsx';

const validationSchema = Yup.object({
  name: Yup.string().required().min(3).max(20),
  description: Yup.string().required().min(3).max(30),
});

function CameraFormEdit({ selectedCamera }) {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(formActions.showEditForm(false));
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      screenshotLink: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm, setSubmitting, setFieldError }) => {
      dispatch(cameraThunks.updateOne(values))
        .then((resp) => {
          unwrapResult(resp);
          resetForm();
          setSubmitting(false);
        })
        .catch((e) => {
          setSubmitting(false);
          setFieldError('network', e.message);
          console.log('catch formik err -', e);
        });
    },
  });

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    selectedCamera && formik.setValues(selectedCamera);
  }, [selectedCamera]);

  // console.log('selectedCamera -', selectedCamera);
  // console.log('formik.errors -', formik.errors);
  // console.log('formik.values -', formik.values);

  return (
    <Col md={12} className="mb-4">
      <Heading lvl={6} className="mb-3">
        CameraInfo
      </Heading>

      <Form className="mb-3" onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
            id="name"
            type="text"
            isInvalid={formik.errors && formik.errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors && formik.errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.description}
            name="description"
            id="description"
            type="text"
            isInvalid={formik.errors && formik.errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors && formik.errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Label htmlFor="screenshotLink">Screenshot Link</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.screenshotLink}
            name="screenshotLink"
            id="screenshotLink"
            type="url"
            isInvalid={formik.errors && formik.errors.screenshotLink}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors && formik.errors.screenshotLink}
          </Form.Control.Feedback>
          <Button variant="outline-secondary" id="button-addon1">
            Check
          </Button>
        </InputGroup>

        <>
          <Button
            onClick={handleCancel}
            disabled={formik.isSubmitting}
            variant="primary"
            size="sm"
            className="me-2"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            variant="primary"
            size="sm"
            className="me-2"
          >
            Submit
            {' '}
            {formik.isSubmitting && <Spinner as="span" animation="border" size="sm" />}
          </Button>
        </>
      </Form>

      <If condition={formik.errors && formik.errors.network}>
        <Error message="Networ error .." />
      </If>
    </Col>
  );
}

export default CameraFormEdit;
