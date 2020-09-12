import getDb, { DB } from '../db';
import { NextApiMiddleware } from './types';

declare module 'next' {
  interface NextApiRequest {
    db: DB;
  }
}

const withDb: NextApiMiddleware = (fn) => (req, res) => {
  // We initialize db repositories for each request.
  const db = getDb();
  // Injecting viewer and authToken to repositories
  Object.values(db).forEach((repo) => repo.patchContext({ db }));
  req.db = db;
  return fn(req, res);
};

export default withDb;
