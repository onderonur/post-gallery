import getDb, { DB } from '.';
import { NextApiMiddleware } from '@api/shared/shared.types';

declare module 'next' {
  interface NextApiRequest {
    db: DB;
  }
}

const withDb: NextApiMiddleware = (fn) => (req, res) => {
  // We initialize db repositories for each request.
  const db = getDb();
  req.db = db;
  return fn(req, res);
};

export default withDb;
