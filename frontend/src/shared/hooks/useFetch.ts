import { useState, useEffect } from 'react';
import { AxiosResponse, AxiosError } from 'axios';

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * API 호출을 위한 커스텀 훅
 * @param fetchFn - API 호출 함수
 * @param immediate - 즉시 실행 여부 (기본: true)
 */
export const useFetch = <T>(
  fetchFn: () => Promise<AxiosResponse<T>>,
  immediate = true
): UseFetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<Error | null>(null);

  const executeFetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchFn();
      setData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(
        new Error(
          axiosError.response?.data?.message ||
          axiosError.message ||
          '요청 중 오류가 발생했습니다.'
        )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      executeFetch();
    }
  }, []);

  return {
    data,
    loading,
    error,
    refetch: executeFetch,
  };
};
