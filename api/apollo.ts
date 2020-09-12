import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '@api/typeDefs';
import resolvers from '@api/resolvers';
import dataSources from '@api/dataSources';
import { GQLContext } from '@api/types';
import { NextApiRequest } from 'next';
import { maskSensitiveInfoFromError } from './utils/maskSensitiveInfoFromError';
import depthLimit from 'graphql-depth-limit';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  // https://www.apollographql.com/blog/securing-your-graphql-api-from-malicious-queries-16130a324a6b/
  validationRules: [depthLimit(10)],
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
