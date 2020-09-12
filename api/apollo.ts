import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '@api/typeDefs';
import resolvers from '@api/resolvers';
import dataSources from '@api/dataSources';
import { GQLContext } from '@api/types';
import { NextApiRequest } from 'next';
import { maskSensitiveInfoFromError } from './utils/maskSensitiveInfoFromError';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req }): Omit<GQLContext, 'dataSources'> => {
    const { viewer, authToken, db } = req as NextApiRequest;
    return {
      viewer,
      authToken,
      db,
    };
  },
  formatError: (err) => {
    const maskedErr = maskSensitiveInfoFromError(err);
    return maskedErr;
  },
});

export default apolloServer;
