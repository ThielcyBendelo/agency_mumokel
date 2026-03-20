import { useState, useEffect } from 'react';

export const useOffline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState('unknown');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check connection type if available
    if ('connection' in navigator) {
      setConnectionType(navigator.connection.effectiveType || 'unknown');
      navigator.connection.addEventListener('change', () => {
        setConnectionType(navigator.connection.effectiveType || 'unknown');
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if ('connection' in navigator) {
        navigator.connection.removeEventListener('change', () => {});
      }
    };
  }, []);

  return { isOnline, connectionType };
};

// Hook for handling image loading with fallbacks
export const useImageWithFallback = (src, fallbackSrc = '/logoM.png') => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImageSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return { imageSrc, handleError, hasError };
};

// Hook for handling external resource loading
export const useResourceLoader = (url, options = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState(null);

  const { timeout = 5000, retries = 2 } = options;

  useEffect(() => {
    let retryCount = 0;
    let timeoutId;

    const loadResource = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        // For images, create an Image object to test loading
        if (url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
          await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = url;

            timeoutId = setTimeout(() => {
              reject(new Error('Timeout'));
            }, timeout);
          });
        } else {
          // For other resources, try fetch
          const response = await Promise.race([
            fetch(url),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Timeout')), timeout)
            )
          ]);

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
        }

        setData(url);
        setIsLoading(false);
      } catch (error) {
        console.warn(`Failed to load resource: ${url}`, error);

        if (retryCount < retries) {
          retryCount++;
          setTimeout(loadResource, 1000 * retryCount); // Exponential backoff
        } else {
          setHasError(true);
          setIsLoading(false);
        }
      } finally {
        if (timeoutId) clearTimeout(timeoutId);
      }
    };

    loadResource();
  }, [url, timeout, retries]);

  return { isLoading, hasError, data };
};
