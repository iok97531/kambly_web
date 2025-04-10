import { useCallback, useEffect, useRef, useState } from 'react';

const cacheStore = new Map<
  string,
  { data: unknown; timestamp: number }
>();

interface UseFetchOptions extends RequestInit {
  immediate?: boolean;
  debounceMs?: number;
  retryCount?: number;
  skip?: boolean;
  cacheKey?: string;       // 캐시 키 (기본은 url + 옵션)
  cacheTime?: number;      // ms 단위 캐시 유효시간
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: (overrideOptions?: RequestInit) => void;
  abort: () => void;
}

export default function useFetch<T = unknown>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchResult<T> {
  const {
    immediate = true,
    debounceMs = 0,
    retryCount = 0,
    skip = false,
    cacheKey,
    cacheTime = 0,
    ...fetchOptions
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate && !skip);
  const [error, setError] = useState<Error | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 캐시 키 생성
  const resolvedCacheKey =
    cacheKey || `${url}_${JSON.stringify(fetchOptions)}`;

  const fetchData = useCallback(
    async (overrideOptions?: RequestInit, retry = retryCount) => {
      if (skip) return;

      // 캐시 체크
      const cached = cacheStore.get(resolvedCacheKey);
      const now = Date.now();
      if (cached && (!cacheTime || now - cached.timestamp < cacheTime)) {
        setData(cached.data as T);
        setLoading(false);
        return;
      }

      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, {
          ...fetchOptions,
          ...overrideOptions,
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`HTTP error ${res.status}`);

        const json = (await res.json()) as T;
        setData(json);

        // 캐시에 저장
        cacheStore.set(resolvedCacheKey, {
          data: json,
          timestamp: Date.now(),
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err);
          if (retry > 0) {
            setTimeout(() => fetchData(overrideOptions, retry - 1), 1000);
          }
        }
      } finally {
        setLoading(false);
      }
    },
    [url, resolvedCacheKey, JSON.stringify(fetchOptions), skip, retryCount, cacheTime]
  );

  const debouncedFetch = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (debounceMs > 0) {
      timeoutRef.current = setTimeout(() => fetchData(), debounceMs);
    } else {
      fetchData();
    }
  }, [fetchData, debounceMs]);

  useEffect(() => {
    if (immediate && !skip) debouncedFetch();
    return () => abortRef.current?.abort();
  }, [debouncedFetch]);

  return {
    data,
    loading,
    error,
    refetch: (overrideOptions?: RequestInit) => fetchData(overrideOptions),
    abort: () => abortRef.current?.abort(),
  };
}