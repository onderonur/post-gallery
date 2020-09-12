import { useRouter } from 'next/router';
import { useState, useCallback, useMemo, useEffect } from 'react';

const useOverlayState = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const router = useRouter();

  useEffect(() => {
    const eventType = 'routeChangeComplete';

    router.events.on(eventType, close);

    return () => {
      router.events.off(eventType, close);
    };
  }, [close, router.events]);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return value;
};

export default useOverlayState;
