import BaseDataSource from '../shared/base.datasource';
import { AuthTokenGraphConnectionArgs } from '../db/authToken';

export class AuthAPI extends BaseDataSource {
  async deleteViewerAuthTokensExceptCurrent() {
    const { db } = this.context;
    const isDeleted = await db.authToken.deleteAllExceptCurrent();
    return isDeleted;
  }

  async findAuthTokenConnectionByUserId(args: AuthTokenGraphConnectionArgs) {
    const { db, viewer } = this.context;
    const connection = await db.authToken.findConnection({
      ...args,
      userId: viewer?.id,
    });
    return connection;
  }
}
