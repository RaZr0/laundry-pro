import { useEffect, useState } from 'react';

function getMatchedMediaQuery() {
  if (typeof window === 'undefined') {
      return {
          matches: false,
          addEventListener: () => {},
          removeEventListener: () => {}
      }
  }
  return window.matchMedia('(max-width: 1023px)');
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getMatchedMediaQuery().matches);

  useEffect(() => {
    const mediaQuery = getMatchedMediaQuery();

    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    updateIsMobile();

    mediaQuery.addEventListener('change', updateIsMobile);
    return () => mediaQuery.removeEventListener('change', updateIsMobile);
  }, []);

  return isMobile;
}