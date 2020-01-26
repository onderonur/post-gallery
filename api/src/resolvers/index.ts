import { Resolvers } from '../generated/graphql';
import mutations from './mutations';
import { GQLContext } from '../types';
import scalars from './scalars';
import merge from 'lodash/merge';
import queries from './queries';

const resolvers: Resolvers<GQLContext> = merge(
  {},
  scalars,
  queries,
  mutations,
  {
    MutationResponse: {
      __resolveType: () => {
        // TODO: This __resolveType implementation may need a fix.
        // Need to check how to use it with TypeScript (or graphql-codegen).
        return null;
      },
    },
  },
);

export default resolvers;
