import BaseDataSource from './BaseDataSource';
import { EMPTY_CONNECTION } from '../db/entity/utils/connection';
import { ConnectionOptions } from '../types';

export class SessionAPI extends BaseDataSource {
  async findViewerSessions(args: ConnectionOptions) {
    const { loaders } = this.context;
    const result = await loaders.session.sessionConnectionByUserId.load(args);
    return result?.connection || EMPTY_CONNECTION;
  }
}
