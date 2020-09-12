import { NextApiRequest } from 'next';
import { DB } from '..';

interface BaseRepositoryContext {
  viewer: NextApiRequest['viewer'];
  authToken: NextApiRequest['authToken'];
  db: DB;
}

class BaseRepository {
  context: BaseRepositoryContext;

  patchContext(partialContext: Partial<BaseRepositoryContext>) {
    this.context = { ...this.context, ...partialContext };
  }
}

export default BaseRepository;
