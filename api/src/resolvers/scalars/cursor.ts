import { Resolvers } from '../../generated/graphql';
import { GQLContext } from '../../types';
import { GraphQLScalarType, Kind } from 'graphql';
import { toBase64, fromBase64 } from '../../utils';

const CURSOR_PREFIX = 'cursor:';

const toCursor = (text: string) => {
  return toBase64(`${CURSOR_PREFIX}${text}`);
};

const fromCursor = (cursor: string) => {
  const decoded = fromBase64(cursor);
  const text = decoded.replace(CURSOR_PREFIX, '');
  return text;
};

export const Cursor: Resolvers<GQLContext>['Cursor'] = new GraphQLScalarType({
  name: 'Cursor',
  description: 'Cursor scalar type for pagination',
  parseValue(value) {
    return fromCursor(value);
  },
  serialize(value) {
    return toCursor(value);
  },
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.STRING:
        return fromCursor(ast.value);
      default:
        return null;
    }
  },
});
