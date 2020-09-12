import hash from 'object-hash';

export const getDataLoaderCacheKey = <Key>(key: Key) =>
  typeof key === 'object' ? hash(key) : `${key}`;
