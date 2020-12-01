import { Maybe } from '@src/generated/graphql';
import { goTry } from 'go-try';
import { useCallback, useRef, useState } from 'react';

type UseLazyAsyncResult<Data, Variables> = [
  (variables: Variables) => Promise<Data>,
  { data: Maybe<Data>; loading: boolean; error: Maybe<Error> },
];

const useLazyAsync = <Data, Variables>(
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

export default useLazyAsync;
