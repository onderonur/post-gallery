import produce from "immer";
import { isNullOrUndefined } from "util";

// https://rangle.io/blog/how-to-use-typescript-type-guards/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isOfType = <T>(obj: any, keys: (keyof T)[]): obj is T => {
  for (const key of keys) {
    if (!(key in obj)) {
      return false;
    }
  }
  return true;
};

export const trimString = (str: string) => str.trim();

// TODO: Will specify a generic connection type with a lot of "Maybe<...>" here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateConnectionAfterFetchMore = <T extends any>(
  prevConnection: T,
  moreConnection: T | undefined,
) => {
  if (!moreConnection) {
    return prevConnection;
  }
  const newConnection = produce(prevConnection, draft => {
    if (draft.edges) {
      draft.edges.push(...moreConnection.edges);
    }
    if (draft.pageInfo) {
      draft.pageInfo = moreConnection.pageInfo;
    }
    if (!isNullOrUndefined(draft.totalCount)) {
      draft.totalCount = moreConnection.totalCount;
    }
  });
  return newConnection;
};

// TODO: Will specify a generic connection type with a lot of "Maybe<...>" here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addEdgeToConnection = <T extends any>(
  connection: T,
  // TODO:
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  edge: any,
) => {
  const newConnection = produce(connection, draft => {
    // Inserting the new edge to the beginning of the connection
    connection.edges.unshift(edge);
    connection.totalCount++;
  });

  return newConnection;
};
