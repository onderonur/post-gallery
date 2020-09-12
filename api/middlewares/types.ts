import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export type NextApiMiddleware = (
  fn: NextApiHandler,
) => (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>;
