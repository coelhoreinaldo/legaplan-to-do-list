import { useState, useEffect } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    }
  }, [isClient, key]);

  const setValue = (value: T) => {
    setStoredValue(value);
    if (isClient) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  };

  const removeValue = () => {
    if (isClient) {
      window.localStorage.removeItem(key);
    }
  };

  return [storedValue, setValue, removeValue];
}
