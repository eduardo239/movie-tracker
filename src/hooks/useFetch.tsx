import { useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
};

function useFetch<T>(
  url: string,
  options?: AxiosRequestConfig | undefined
): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios.get(url, options);
        setData(response.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
