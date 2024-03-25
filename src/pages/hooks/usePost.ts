import { useState, useEffect } from "react";
import { type AxiosError } from "axios";
import { api } from "~/utils/api";
import { type AppRouterPaths } from "~/server/api/root";

const usePost = <P = unknown, T = unknown>(url: AppRouterPaths, payload: P) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await api.post<T>(url, payload);
        setData(response.data as T | null);
      } catch (err) {
        setError(err as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    void postData();
  }, [url, payload]);

  return { data, loading, error };
};

export default usePost;
