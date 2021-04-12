import { Resolvers } from '../generated/graphql';
import { GraphQLScalarType, Kind } from 'graphql';

// We can use "graphql-scalars" for "Date" too.
// But we use this resolver as an example.
export const date: Resolvers['Date'] = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value: Date) {
    return value.toISOString(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // ast value is always in string format
    }
    return null;
  },
});
