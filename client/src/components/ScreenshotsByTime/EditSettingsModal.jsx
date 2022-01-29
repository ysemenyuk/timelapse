import React, { useEffect } from 'react';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getFilesPerDay } from '../../utils/utils.js';

// const validationSchema = Yup.object({
//   start: Yup.string().required(),
//   finish: Yup.string().required(),
//   interval: Yup.string().required(),
// });

function EditSettingsModal({ screenshotsData, visible, onClose, onSubmit }) {
  // const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      startTime: null,
      stopTime: null,
      screenshotInterval: 60,
    },
    // validationSchema,
    onSubmit: (values) => {
      console.log('onSubmit values', values);
      onSubmit(formik.values);
      onClose();
    },
  });

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    screenshotsData && formik.setValues(screenshotsData);
  }, [screenshotsData]);

  // console.log('formik.errors -', formik.errors);
  // console.log('formik.values -', formik.values);

  return (
    <Modal
      aria-labelledby="modal-settings"
      show={visible}
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="modal-settings">Edit settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Row className="mb-3">
          <Col>
            Create screenshot files every day
          </Col>
        </Row>

        <Form className="mb-3">
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label htmlFor="startTime">Start time</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.startTime}
                name="startTime"
                id="startTime"
                type="time"
                isInvalid={formik.errors && formik.errors.startTime}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.startTime}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label htmlFor="stopTime">Stop time</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.stopTime}
                name="stopTime"
                id="stopTime"
                type="time"
                isInvalid={formik.errors && formik.errors.stopTime}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.stopTime}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label htmlFor="screenshotInterval">Interval (seconds)</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.screenshotInterval}
                name="screenshotInterval"
                id="screenshotInterval"
                type="number"
                isInvalid={formik.errors && formik.errors.screenshotInterval}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.screenshotInterval}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Col>
              <span className="fw-bold">
                {`${getFilesPerDay(formik.values)} files`}
              </span>
              {' '}
              per day
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <span className="fw-bold">
                {`${Math.round(getFilesPerDay(formik.values) / 25)} seconds`}
              </span>
              {' '}
              (25 fps) video of the day
            </Col>
          </Row>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <>
          <Button
            key="close"
            onClick={onClose}
            className="me-2"
          >
            Cancel
          </Button>
          <Button
            key="submit"
            onClick={formik.handleSubmit}
            className="me-2"
          >
            Submit
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  );
}

export default EditSettingsModal;
