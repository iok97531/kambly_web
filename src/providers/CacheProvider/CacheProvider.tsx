import React, { createContext, useContext, useCallback, useState } from 'react';
import { CacheContextType, CacheItem, CacheProviderProps } from './types';

const CacheContext = createContext<CacheContextType | null>(null);

export const useCache = () => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCache must be used within a CacheProvider');
  }
  return context;
};

export const CacheProvider: React.FC<CacheProviderProps> = ({
  children,
  defaultExpiryInSeconds = 3600, // 1 hour default
}) => {
  const [cache, setCache] = useState<Record<string, CacheItem<any>>>({});

  const get = useCallback(<T,>(key: string): T | null => {
    const item = cache[key];
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > item.expiry * 1000) {
      // Item has expired, remove it
      setCache((prev) => {
        const newCache = { ...prev };
        delete newCache[key];
        return newCache;
      });
      return null;
    }

    return item.data as T;
  }, [cache]);

  const set = useCallback(<T,>(key: string, data: T, expiryInSeconds?: number) => {
    const now = Date.now();
    setCache((prev) => ({
      ...prev,
      [key]: {
        data,
        timestamp: now,
        expiry: expiryInSeconds ?? defaultExpiryInSeconds,
      },
    }));
  }, [defaultExpiryInSeconds]);

  const remove = useCallback((key: string) => {
    setCache((prev) => {
      const newCache = { ...prev };
      delete newCache[key];
      return newCache;
    });
  }, []);

  const clear = useCallback(() => {
    setCache({});
  }, []);

  const value = {
    get,
    set,
    remove,
    clear,
  };

  return (
    <CacheContext.Provider value={value}>
      {children}
    </CacheContext.Provider>
  );
}; 