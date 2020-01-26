import { Edge, Cursor } from '../../types';
import { getLastOfArray } from '../../utils';
import Maybe from 'graphql/tsutils/Maybe';
import { BaseEntity, FindOneOptions } from 'typeorm';

type GetCursorFn<T> = (item: T) => Cursor;

const createEdges = <T>(
  array: T[],
  getCursor: (item: T) => string,
): Edge<T>[] => {
  const edges = array.map(item => ({ node: item, cursor: getCursor(item) }));
  return edges;
};

const getEndCursor = <T>(edges: Edge<T>[]) => {
  const lastEdge = getLastOfArray(edges);
  if (lastEdge) {
    return lastEdge.cursor;
  }

  return null;
};

interface ConnectionOptions<T> {
  order: FindOneOptions<T>['order'];
  where: FindOneOptions<T>['where'];
  first: Maybe<number>;
  getCursorFn: GetCursorFn<T>;
}

export const findAndGetConnection = async <T extends BaseEntity>(
  entity: typeof BaseEntity,
  { order, where, first, getCursorFn }: ConnectionOptions<T>,
) => {
  const [items, totalCount] = await entity.findAndCount({
    order,
    where,
    take: first ? first + 1 : undefined,
  });
  const hasNextPage = first ? items.length > first : false;
  const edges = createEdges(
    hasNextPage ? items.slice(0, items.length) : items,
    getCursorFn,
  );
  const pageInfo = {
    hasNextPage,
    endCursor: getEndCursor(edges),
  };
  return {
    totalCount,
    edges,
    pageInfo,
  };
};
