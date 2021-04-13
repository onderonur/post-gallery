import { ID } from '../shared/shared.types';
import BaseDataSource from '../shared/base.datasource';
import { PostGraphConnectionArgs } from '@api/posts/post.repository';
import { Maybe, Omit, PostInput } from '@api/generated/graphql';
import { ApolloError } from 'apollo-server-micro';

type FindPostConnectionArgs = Omit<PostGraphConnectionArgs, 'categoryId'> & {
  categorySlug?: string;
};

class PostAPI extends BaseDataSource {
  async findPostConnection({
    first,
    after,
    authorId,
    categorySlug,
  }: FindPostConnectionArgs) {
    const { db, dataSources } = this.context;
    // TODO: This could be done in a single query by using a join.
    // But to not make "findGraphConnection" more complicated,
    // this is just skipped. May be improved later.
    let categoryId: Maybe<ID>;
    if (categorySlug) {
      const category = await dataSources.categoryAPI.findOneCategoryBySlug(
        categorySlug,
      );
      if (!category) {
        throw new ApolloError('Category not found');
      }
      categoryId = category.id;
    }
    const connection = await db.post.findConnection({
      first,
      after,
      authorId,
      categoryId,
    });
    return connection;
  }

  async findOnePostById(id: ID) {
    const { db } = this.context;
    const post = await db.post.findOneById(id);
    return post;
  }

  async createPost(input: PostInput) {
    const { db, dataSources } = this.context;
    const media = await dataSources.mediaAPI.findOneById(input.mediaId);
    if (!media) {
      throw new ApolloError('media not found');
    }
    const post = await db.post.create({ ...input, media });
    return post;
  }

  async deletePost(id: ID) {
    const { db } = this.context;
    const isDeleted = await db.post.deleteById(id);
    return isDeleted;
  }

  async countPostsByUserId(userId: ID) {
    const { db } = this.context;
    const postsCount = await db.post.countByUserId(userId);
    return postsCount;
  }
}

export default PostAPI;
