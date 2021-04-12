import { useMediaQuery, Theme } from '@material-ui/core';
import { Maybe } from '@src/generated/graphql';
import { goTry } from 'go-try';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const useIsMobile = () => {
  // https://material-ui.com/customization/breakpoints/#default-breakpoints
  // https://material-ui.com/customization/breakpoints/#theme-breakpoints-down-key-media-query
  const matches = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  return matches;
};

type UseLazyAsyncResult<Data, Variables> = [
  (variables: Variables) => Promise<Data>,
  { data: Maybe<Data>; loading: boolean; error: Maybe<Error> },
];

export const useLazyAsync = <Data, Variables>(
  promiseFn: UseLazyAsyncResult<Data, Variables>[0],
): UseLazyAsyncResult<Data, Variables> => {
  const [data, setData] = useState<Maybe<Data>>(null);
  const [error, setError] = useState<Maybe<Error>>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const lastCallTimeStamp = useRef<number>(0);

  const run = useCallback(
    async (variables: Variables) => {
      const timeStamp = Date.now();
      lastCallTimeStamp.current = timeStamp;
      setLoading(true);
      setError(null);

      const result = await goTry(() => promiseFn(variables));

      setLoading(false);

      const isSameTimestamp = timeStamp === lastCallTimeStamp.current;

      if (result.error) {
        if (isSameTimestamp) {
          setError(result.error);
        }
        throw result.error;
      }
      setData(result.data);
      return result.data;
    },
    [promiseFn],
  );

  return [run, { data, loading, error }];
};

export const useOverlayState = () => {
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
