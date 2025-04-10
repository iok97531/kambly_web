export interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

export interface CacheContextType {
  get: <T>(key: string) => T | null;
  set: <T>(key: string, data: T, expiryInSeconds?: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

export interface CacheProviderProps {
  children: React.ReactNode;
  defaultExpiryInSeconds?: number;
} 