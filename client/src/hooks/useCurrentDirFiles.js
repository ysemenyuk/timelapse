import { useEffect, useState } from 'react';
import axios from 'axios';

export default function (currentDir) {
  const [isLoading, setIsLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [files, setFiles] = useState([]);

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(async () => {
    if (currentDir !== null) {
      try {
        setIsSuccess(false);
        setIsLoading(true);
        const { data } = await axios.get(
          `http://localhost:3000/api/files?parentId=60d262484de6470b3139a375`
        );
        // console.log(data);
        setFiles(data);
        setIsSuccess(true);
      } catch (err) {
        // console.log(err);
        setIsError(true);
        setError(err.messsage);
      }
      setIsLoading(false);
    }
  }, [currentDir]);

  return { files, error, isLoading, isSuccess, isError };
}
