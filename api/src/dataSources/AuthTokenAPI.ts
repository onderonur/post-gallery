import BaseDataSource from './BaseDataSource';
import { EMPTY_CONNECTION } from '../db/entity/utils/connection';
import { AuthTokenConnectionOptions } from '../db/entity/AuthToken';
import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

export class AuthTokenAPI extends BaseDataSource {
  async findAuthTokenConnectionByUserId(args: AuthTokenConnectionOptions) {
    const { loaders, viewer, authToken } = this.context;
    // Users can only search for their own information for now.
    // When we have roles like admins etc,
    // this condition will be expanded.
    if (!viewer || !authToken || viewer.id !== args.userId) {
      throw new AuthenticationError(
        "You don't have permission for this operation.",
      );
    }
    const decodedToken = jwt.decode(authToken);
    const { jti } = decodedToken as any;
    const result = await loaders.authTokenLoaders.authTokenConnectionByUserId.load(
      { ...args, jti },
    );
    return result?.connection || EMPTY_CONNECTION;
  }
}
