import BaseDataSource from './BaseDataSource';
import { UpdateUserInput } from '../generated/graphql';
import { ApolloError } from 'apollo-server-express';

export class UserAPI extends BaseDataSource {
  async loadUserById(id: string) {
    const { loaders } = this.context;
    const user = await loaders.user.userById.load(id);
    return user;
  }

  async updateUser(input: UpdateUserInput) {
    const { id } = input;
    const user = await this.loadUserById(id);
    if (!user) {
      throw new ApolloError("Couldn't find the user");
    }
    user.displayName = input.displayName;
    await user.save();
    return user;
  }
}
