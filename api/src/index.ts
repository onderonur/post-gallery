import 'dotenv/config';
// TypeOrm needs this
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import dataSources from './dataSources';
import { createLoaders } from './loaders';
import { convertMBToBytes } from './utils';
import routes from './routes';
import middlewares from './middlewares';

const {
  PORT,
  MAX_FILE_SIZE_IN_MB,
  MAX_FILES_COUNT,
  CLIENT_BUILD_PATH,
} = process.env;

async function runServer() {
  await createConnection();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    uploads: {
      maxFileSize: convertMBToBytes(MAX_FILE_SIZE_IN_MB),
      maxFiles: MAX_FILES_COUNT,
    },
    context: () => {
      return {
        loaders: createLoaders(),
      };
    },
  });

  const app = express();

  // Middlewares
  app.use(middlewares.helmet());
  app.use(middlewares.passport.initialize());

  // All the routes except the "/graphql" endpoint
  app.use('/', routes);

  server.applyMiddleware({ app });

  const clientBuildPath = CLIENT_BUILD_PATH;
  const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction) {
    // Serve bundled client app files
    app.use(express.static(path.join(__dirname, clientBuildPath)));
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, clientBuildPath, 'index.html'));
    });
  }

  app.use(middlewares.errorHandler);

  app.listen({ port: PORT }, () => {
    // eslint-disable-next-line no-console
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
    );
  });
}

runServer();
