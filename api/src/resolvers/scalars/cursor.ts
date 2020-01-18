import { Resolvers } from '../../generated/graphql';
import { GQLContext } from '../../types';
import { GraphQLScalarType, Kind } from 'graphql';

const toCursor = (text: string) => {
  return Buffer.from(`cursor:${text}`).toString('base64');
};

const fromCursor = (cursor: string) => {
  const decoded = Buffer.from(cursor, 'base64').toString();
  const text = decoded.split(':')[1];
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
