import 'dotenv/config';
// TypeOrm needs this
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import dataSources from './dataSources';
import { createLoaders } from './loaders';
import { convertMBToBytes } from './utils';
import routes from './routes';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { errorHandler, authenticate } from './middlewares';
import { GQLContext } from './types';
import useragent from 'express-useragent';

const { MAX_FILE_SIZE_IN_MB, MAX_FILES_COUNT } = process.env;

// Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  uploads: {
    maxFileSize: convertMBToBytes(MAX_FILE_SIZE_IN_MB),
    maxFiles: MAX_FILES_COUNT,
  },
  context: ({ req }): Omit<GQLContext, 'dataSources'> => {
    const viewer = req.user;
    return {
      viewer,
      loaders: createLoaders(viewer),
    };
  },
});

const { PORT } = process.env;

async function runServer() {
  await createConnection();

  const app = express();

  // Middlewares
  app.use(helmet());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // TODO: Will save the "user-agent" with "auth token" requests
  app.use(useragent.express());

  app.use(authenticate);

  // All the routes except the "/graphql" endpoint
  app.use('/', routes);

  server.applyMiddleware({
    app,
    // https://www.apollographql.com/docs/apollo-server/api/apollo-server/#apolloserverapplymiddleware
    cors: false,
  });

  // Error handling middleware
  app.use(errorHandler);

  app.listen({ port: PORT }, () => {
    // eslint-disable-next-line no-console
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
    );
  });
}

runServer();
