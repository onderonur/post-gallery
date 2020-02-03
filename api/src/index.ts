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
import { convertMBToBytes } from './utils';
import routes from './routes';
import helmet from 'helmet';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errorHandler } from './middlewares';
import { User } from './entity/User';
import { GQLContext } from './types';

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_SECRET,
  MAX_FILE_SIZE_IN_MB,
  MAX_FILES_COUNT,
  CLIENT_BUILD_PATH,
  NODE_ENV,
  PORT,
} = process.env;

async function runServer() {
  await createConnection();

  const app = express();

  // Middlewares
  app.use(helmet());
  app.use(cors());
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
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

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

  // All the routes except the "/graphql" endpoint
  app.use('/', routes);

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
      const { user } = req;
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }
      return {
        user,
        loaders: createLoaders(),
      };
    },
  });

  server.applyMiddleware({ app });

  const clientBuildPath = CLIENT_BUILD_PATH;
  const isProduction = NODE_ENV === 'production';
  if (isProduction) {
    // Serve bundled client app files
    app.use(express.static(path.join(__dirname, clientBuildPath)));
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, clientBuildPath, 'index.html'));
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
