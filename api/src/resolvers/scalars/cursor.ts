import { Resolvers } from '../../generated/graphql';
import { GQLContext } from '../../types';
import { GraphQLScalarType, Kind } from 'graphql';
import { encode, decode } from '../../utils';

const CURSOR_PREFIX = 'cursor:';

const toCursor = (text: string) => {
  return encode(`${CURSOR_PREFIX}${text}`);
};

const fromCursor = (cursor: string) => {
  const decoded = decode(cursor);
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
