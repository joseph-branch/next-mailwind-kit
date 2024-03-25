import { useState, useEffect } from "react";
import { type AxiosError } from "axios";
import { api } from "~/utils/api";
import { type AppRouterPaths } from "~/server/api/root";

const useGet = <T = unknown>(url: AppRouterPaths) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get<T>(url);
        setData(response.data as T | null);
      } catch (err) {
        setError(err as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    void getData();
  }, [url]);

  return { data, loading, error };
};

export default useGet;
