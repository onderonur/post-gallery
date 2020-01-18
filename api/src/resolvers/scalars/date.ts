import { Resolvers } from '../../generated/graphql';
import { GQLContext } from '../../types';
import { GraphQLScalarType, Kind } from 'graphql';

export const date: Resolvers<GQLContext>['Date'] = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value.toISOString(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // ast value is always in string format
    }
    return null;
  },
});
