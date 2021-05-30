import { useEffect, useState } from 'react';
import axios from 'axios';

import apiRoutes from '../apiRoutes.js';

export default function (currentDir) {
  const [isLoading, setIsLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState(null);

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(async () => {
    if (currentDir !== null) {
      try {
        setIsSuccess(false);
        setIsLoading(true);
        const { data } = await axios.get(apiRoutes.filesPath(currentDir._id));
        // console.log(data);
        setData(data);
        setIsSuccess(true);
      } catch (err) {
        // console.log(err);
        setIsError(true);
        setError(err.messsage);
      }
      setIsLoading(false);
    }
  }, [currentDir]);

  return { data, error, isLoading, isSuccess, isError };
}
