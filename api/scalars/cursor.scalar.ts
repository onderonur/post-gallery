import { Resolvers } from '../generated/graphql';
import { GraphQLScalarType, Kind } from 'graphql';
import { toBase64, fromBase64 } from '../shared/shared.utils';

const cursorPrefix = 'cursor:';

const toCursor = (text: string) => {
  return toBase64(`${cursorPrefix}${text}`);
};

const fromCursor = (cursor: string) => {
  const decoded = fromBase64(cursor);
  const text = decoded.replace(cursorPrefix, '');
  return text;
};

export const Cursor: Resolvers['Cursor'] = new GraphQLScalarType({
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
