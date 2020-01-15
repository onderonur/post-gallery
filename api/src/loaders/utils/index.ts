import DataLoader from 'dataloader';

export function createLoader<Key, Data>(
  batchFn: (keys: ReadonlyArray<Key>) => Promise<Data[]>,
  mapperField: (data: Data) => Key,
) {
  return () => {
    return new DataLoader<Key, Data>(async keys => {
      const results = await batchFn(keys);
      const mappedResults = keys.map(
        key =>
          results.find(data => mapperField(data) === key) ||
          new Error(`No result for ${key}`),
      );
      return mappedResults;
    });
  };
}

export function createMultiLoader<Key, Data>(
  batchFn: (keys: ReadonlyArray<Key>) => Promise<Data[]>,
  mapperField: (data: Data) => Key,
) {
  return () => {
    return new DataLoader<Key, Data[]>(async keys => {
      const results = await batchFn(keys);
      const mappedResults = keys.map(
        key =>
          results.filter(data => mapperField(data) === key) ||
          new Error(`No result for ${key}`),
      );
      return mappedResults;
    });
  };
}
