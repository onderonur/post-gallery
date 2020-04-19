import DataLoader from 'dataloader';
import { RequestUser } from '../../types';
import { Maybe } from '../../generated/graphql';
import hash from 'object-hash';

type DataLoaderCacheKey = string;

export const getDataLoaderCacheKey = <Key>(key: Key) =>
  typeof key === 'object' ? hash(key) : `${key}`;

export function createLoader<Key, Data>(
  batchFn: (
    keys: ReadonlyArray<Key>,
    viewer: Maybe<RequestUser>,
  ) => Promise<Data[]>,
  mapperField: (data: Data) => string,
) {
  return (viewer: Maybe<RequestUser>) => {
    return new DataLoader<Key, Maybe<Data>, DataLoaderCacheKey>(
      async keys => {
        const results = await batchFn(keys, viewer);
        const mappedResults = keys.map(key =>
          results.find(
            data =>
              mapperField(data) ===
              (typeof key === 'object' ? getDataLoaderCacheKey(key) : key),
          ),
        );
        return mappedResults;
      },
      {
        cacheKeyFn: getDataLoaderCacheKey,
      },
    );
  };
}

export function createMultiLoader<Key, Data>(
  batchFn: (
    keys: ReadonlyArray<Key>,
    viewer: Maybe<RequestUser>,
  ) => Promise<Data[]>,
  mapperField: (data: Data) => string,
) {
  return (viewer: Maybe<RequestUser>) => {
    return new DataLoader<Key, Data[], DataLoaderCacheKey>(
      async keys => {
        const results = await batchFn(keys, viewer);
        const mappedResults = keys.map(key =>
          results.filter(
            data =>
              mapperField(data) ===
              (typeof key === 'object' ? getDataLoaderCacheKey(key) : key),
          ),
        );
        return mappedResults;
      },
      {
        cacheKeyFn: getDataLoaderCacheKey,
      },
    );
  };
}
