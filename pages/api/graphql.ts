import prepareHandler from '@api/middlewares/prepareHandler';
import apolloServer from '@api/apollo';

// Note about CORS:
// https://nextjs.org/docs/api-routes/introduction
// API Routes do not specify CORS headers, meaning they are same-origin only by default.
// You can customize such behavior by wrapping the request handler with the cors middleware.

export const config = {
  api: {
    bodyParser: false,
  },
};

export default prepareHandler(
  apolloServer.createHandler({ path: '/api/graphql' }),
);
