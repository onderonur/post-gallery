import { NextApiRequest } from 'next';

interface BaseRepositoryContext {
  viewer: NextApiRequest['viewer'];
  authToken: NextApiRequest['authToken'];
}

class BaseRepository {
  context: BaseRepositoryContext;

  patchContext(partialContext: Partial<BaseRepositoryContext>) {
    this.context = { ...this.context, ...partialContext };
  }
}

export default BaseRepository;
