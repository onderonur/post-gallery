import { Maybe } from '@api/generated/graphql';
import { ObjectionModelToPojo } from '@api/shared/shared.types';
import { getLastOfArray } from '@api/shared/shared.utils';
import { UserInputError } from 'apollo-server-micro';
import Knex from 'knex';
import Objection from 'objection';
import { knex } from '../base.model';

const maxConnectionNodeLimit = 100;
const minConnectionNodeLimit = 0;

export async function findGraphConnection<
  ModelClass extends Objection.Model
>(args: {
  tableName: string;
  orderBy: keyof ObjectionModelToPojo<ModelClass>;
  first: Maybe<number>;
  after: Maybe<string>;
  getCursorFn: (node: ModelClass) => string;
  where?: (query: Knex.QueryBuilder<ObjectionModelToPojo<ModelClass>>) => void;
}) {
  const { tableName, orderBy, after, getCursorFn, where } = args;
  let { first } = args;
  first = first ?? minConnectionNodeLimit;

  // We validate the input parameters first.
  if (first > maxConnectionNodeLimit) {
    throw new UserInputError(
      `Max pagination size can be ${maxConnectionNodeLimit}.`,
    );
  } else if (first < minConnectionNodeLimit) {
    throw new UserInputError(
      `Min pagination size can be ${minConnectionNodeLimit}`,
    );
  }

  const limit = first + 1;

  const withQuery = knex.with(
    'Ordered',
    knex.raw('SELECT *, ROW_NUMBER() OVER (ORDER BY ?? DESC) FROM ??', [
      orderBy as string,
      tableName,
    ]),
  );

  if (where) {
    withQuery.where(where);
  }

  const query = withQuery.select('*').from('Ordered').limit(limit);

  if (after) {
    const subQuery = knex('Ordered').select('row_number').where({ id: after });
    query.where('row_number', '>', subQuery);
  }

  const result = (await query) as ObjectionModelToPojo<ModelClass>[];

  const edges = result.map((node) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cursor: getCursorFn(node as any),
    node,
  }));

  let hasNextPage = false;
  if (edges.length > first) {
    hasNextPage = true;
    edges.pop();
  }

  const lastEdge = getLastOfArray(edges);
  const endCursor = lastEdge?.cursor;

  return {
    edges,
    pageInfo: {
      hasNextPage,
      endCursor,
    },
  };
}
