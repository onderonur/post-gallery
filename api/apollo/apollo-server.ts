import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '@api/app/app.schema';
import resolvers from '@api/app/app.resolver';
import dataSources from '@api/app/app.datasource';
import { GQLContext } from '@api/shared/shared.types';
import { NextApiRequest } from 'next';
import { maskSensitiveInfoFromError } from '../error-handling/error-handling.utils';
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
