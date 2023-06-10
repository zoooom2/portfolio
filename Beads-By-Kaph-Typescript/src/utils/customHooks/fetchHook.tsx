import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export const useFetch = (url: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    const response = await axios.get(url);
    setData(response.data);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getData();
  }, [url]);

  return { loading, data };
};
