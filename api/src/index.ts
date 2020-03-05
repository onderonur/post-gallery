import 'dotenv/config';
// TypeOrm needs this
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import session from 'express-session';
import pg from 'pg';
import connectPg from 'connect-pg-simple';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import path from 'path';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import dataSources from './dataSources';
import { createLoaders } from './loaders';
import { convertMBToBytes, IS_PROD } from './utils';
import routes from './routes';
import helmet from 'helmet';
import passport from 'passport';
import bodyParser from 'body-parser';
import { errorHandler, passCsrfTokenToClient } from './middlewares';
import { User } from './db/entity/User';
import { GQLContext } from './types';
import csrf from 'csurf';

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
  playground: {
    settings: {
      // To send session cookie while using GraphQL Playground
      'request.credentials': 'same-origin',
    },
  },
  context: ({ req }): Omit<GQLContext, 'dataSources'> => {
    const { user: viewer } = req;
    return {
      viewer,
      loaders: createLoaders(viewer),
    };
  },
});

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_SECRET,
  CLIENT_BUILD_PATH,
  PORT,
} = process.env;

async function runServer() {
  await createConnection();

  const app = express();

  // Middlewares
  app.use(helmet());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const PgSession = connectPg(session);
  const pgPool = new pg.Pool({
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE,
  });
  app.use(
    session({
      name: SESSION_COOKIE_NAME,
      secret: SESSION_COOKIE_SECRET,
      store: new PgSession({
        pool: pgPool,
      }),
    }),
  );

  // Passport
  type UserId = User['id'];
  passport.serializeUser<User, UserId>((user, done) => {
    return done(null, user.id);
  });
  passport.deserializeUser<User, UserId>(async (id, done) => {
    try {
      const user = await User.findOne(id);
      if (user) {
        return done(null, user);
      }
      return done(new AuthenticationError('Invalid credentials'));
    } catch (error) {
      return done(error);
    }
  });
  app.use(passport.initialize());
  app.use(passport.session());

  if (IS_PROD) {
    const csrfProtection = csrf();
    app.use(csrfProtection);
    app.use(passCsrfTokenToClient);
  }

  // All the routes except the "/graphql" endpoint
  app.use('/', routes);

  server.applyMiddleware({
    app,
    // https://www.apollographql.com/docs/apollo-server/api/apollo-server/#apolloserverapplymiddleware
    cors: false,
  });

  if (IS_PROD) {
    // Serve bundled client app files
    app.use(express.static(path.join(__dirname, CLIENT_BUILD_PATH)));
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, CLIENT_BUILD_PATH, 'index.html'));
    });
  }

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
