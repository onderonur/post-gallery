import { DataLoaderCacheKey } from './types';
import DataLoader from 'dataloader';
import { getDataLoaderCacheKey } from './getDataLoaderCacheKey';
import { Maybe } from '@api/generated/graphql';

export function createLoader<Key, Data, Result = Data>(
  batchFn: (keys: ReadonlyArray<Key>) => Promise<Data[]>,
  mapperField: (data: Data) => Maybe<Key>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapResult: (data: Maybe<Data>) => Maybe<Result> = (data) => data as any,
) {
  return function () {
    return new DataLoader<Key, Maybe<Result>, DataLoaderCacheKey>(
      async (keys) => {
        const results = await batchFn(keys);
        const mappedResults = keys.map((key) => {
          const result = results.find((data) => {
            return data
              ? getDataLoaderCacheKey(mapperField(data)) ===
                  getDataLoaderCacheKey(key)
              : null;
          });
          return mapResult(result);
        });
        return mappedResults;
      },
      { cacheKeyFn: getDataLoaderCacheKey },
    );
  };
}
