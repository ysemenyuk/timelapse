import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const MainInfo = () => {
  const dispatch = useDispatch();
  const camera = useSelector(state => state.cameras.selectedCamera)


  return (
    <>
      <div className="mb-3">Main</div>
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Key</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(camera).map(([key, value], index) => {
              return (
                <tr>
                  <th scope="row">{index}</th>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MainInfo;