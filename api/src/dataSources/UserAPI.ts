import BaseDataSource from './BaseDataSource';

export class UserAPI extends BaseDataSource {
  async loadUserById(id: string) {
    const { loaders } = this.context;
    const user = await loaders.user.userById.load(id);
    return user;
  }
}
