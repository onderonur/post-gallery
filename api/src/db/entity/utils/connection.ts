import { ConnectionOptions, Connection } from '../../../types';
import { getLastOfArray } from '../../../utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emptyConnection: Connection<any> = {
  edges: [],
  pageInfo: {
    hasNextPage: false,
    endCursor: null,
  },
  totalCount: 0,
};

interface ConnectionQueryRow {
  key: string;
  totalCount: number;
}

export const mapConnectionsByHashes = <T extends ConnectionQueryRow>({
  hashes,
  rows,
  getCursorFn,
  args,
}: {
  hashes: string[];
  rows: T[];
  getCursorFn: (row: T) => string;
  args: ConnectionOptions[];
}) => {
  const connectionsByKey = hashes.map((key, i) => {
    const nodes = rows.filter(row => row.key === key);
    const totalCount = getLastOfArray(nodes)?.totalCount || 0;
    const { first } = args[i];
    const hasNextPage = first ? nodes.length > first : false;
    let edges = nodes.map(node => ({
      cursor: getCursorFn(node),
      node,
    }));
    if (hasNextPage) {
      // Removing the "extra" last edge, if we have more edges than requested.
      // This is required, because we fetch 1 additional edge to decide if there is
      // a next page.
      edges = edges.slice(0, nodes.length - 1);
    }
    const endCursor = getLastOfArray(edges)?.cursor;
    return {
      key,
      connection: {
        totalCount,
        edges,
        pageInfo: {
          hasNextPage,
          endCursor,
        },
      },
    };
  });
  return connectionsByKey;
};
