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
        const { data } = await axios.get(`/api/files?parentId=${currentDir._id}`);
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

  return { files, fetchFilesStatus: { error, isLoading, isSuccess, isError } };
}
