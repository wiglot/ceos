import { useState, useCallback } from 'react';
import { encrypt, decrypt } from '../utils/crypto';

interface UseLocalStorageOptions {
  encrypt?: boolean;
}

function useLocalStorage<T>(key: string, initialValue: T, options?: UseLocalStorageOptions): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;

      if (options?.encrypt) {
        try {
          const decrypted = decrypt(item);
          return JSON.parse(decrypted);
        } catch (error) {
          console.warn(`Falha ao descriptografar '${key}', tratando como texto plano.`, error);
          try {
            return JSON.parse(item);
          } catch (e) {
            console.error(`Falha ao analisar o fallback de texto plano para '${key}'.`, e);
            return initialValue;
          }
        }
      }

      return JSON.parse(item);
    } catch (error) {
      console.error(`Erro ao ler a chave de localStorage "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        let stringifiedValue = JSON.stringify(valueToStore);
        if (options?.encrypt) {
          stringifiedValue = encrypt(stringifiedValue);
        }
        window.localStorage.setItem(key, stringifiedValue);
      }
    } catch (error) {
      console.error(`Erro ao definir a chave de localStorage "${key}":`, error);
    }
  }, [key, storedValue, options?.encrypt]);

  return [storedValue, setValue];
}

export default useLocalStorage;
