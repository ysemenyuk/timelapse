import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";

import { cameraActions } from "../store/cameraSlice.js";
// import { formActions } from "../store/formSlice.js";

const CameraList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch("/");

  const cameras = useSelector((state) => state.camera.allItems);
  const selectedCamera = useSelector((state) => state.camera.selectedItem);
  const form = useSelector((state) => state.form);

  // console.log('CameraList cameras', cameras);

  const handleSelectItem = (item) => () => {
    dispatch(cameraActions.selectItem(item));
    if (match.isExact === false) {
      history.push("/");
    }
  };

  if (cameras.length === 0) {
    return (
      <div className="col-12 mb-3">
        <h6 className="mb-3">List</h6>
        <div>No cameras.</div>
      </div>
    );
  }

  return (
    <div className="col-12 mb-3">
      <h6 className="mb-3">List</h6>
      <div className="list-group mb-3">
        {cameras.map((camera) => {
          const activeClass = selectedCamera?._id === camera._id && "active";
          return (
            <button
              onClick={handleSelectItem(camera)}
              key={camera._id}
              type="button"
              className={`list-group-item list-group-item-action ${activeClass}`}
              aria-current="true"
            >
              <div className="fw-bold">{camera.name}</div>
              <small>{camera.description}</small>
            </button>
          );
        })}
      </div>
      <div>
        <Link className="btn btn-primary" to="/form">
          Add camera
        </Link>
      </div>
    </div>
  );
};

export default CameraList;
