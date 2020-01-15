import { GraphQLScalarType, Kind } from 'graphql';
import { Resolvers } from '../generated/graphql';
import { DataSources } from '../dataSources';
import { Loaders } from '../loaders';

const toCursor = (text: string) => {
  return Buffer.from(`cursor:${text}`).toString('base64');
};

const fromCursor = (cursor: string) => {
  const decoded = Buffer.from(cursor, 'base64').toString();
  const text = decoded.split(':')[1];
  return text;
};

interface GQLContext {
  dataSources: DataSources;
  loaders: Loaders;
}

const resolvers: Resolvers<GQLContext> = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.toISOString(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
  Cursor: new GraphQLScalarType({
    name: 'Cursor',
    description: 'Cursor scalar type for pagination',
    parseValue(value) {
      return fromCursor(value);
    },
    serialize(value) {
      return toCursor(value);
    },
    parseLiteral(ast) {
      switch (ast.kind) {
        case Kind.STRING:
          return fromCursor(ast.value);
        default:
          return null;
      }
    },
  }),
  Mutation: {
    createPost: async (parent, { input }, { dataSources }) => {
      const { postAPI } = dataSources;
      const post = await postAPI.createPost(input);
      if (post) {
        return {
          success: true,
          message: 'Post has been created successfully',
          post,
        };
      }

      return {
        success: false,
        message: 'Post could not be created',
      };
    },
    // createSample: async (parent, { input }, { dataSources }) => {
    //   const { fileStorageAPI, sampleAPI } = dataSources;
    //   const { sampleImages } = input;
    //   // Checking if the "sampleImages" array is empty.
    //   if (!sampleImages.length) {
    //     throw new UserInputError(
    //       'Please attach at least 1 image to the sample.',
    //     );
    //   }
    //   // Storing the files.
    //   const uploadResults = await fileStorageAPI.uploadMultiple(sampleImages);
    //   // After we store the files, we create the "sample" instance.
    //   const sample = await sampleAPI.createSample({
    //     ...input,
    //     sampleImages: uploadResults,
    //   });
    //   return {
    //     success: true,
    //     message: 'Sample has been created successfully.',
    //     sample,
    //   };
    // },
    deletePost: async (parent, { id }, { dataSources }) => {
      const { postAPI } = dataSources;
      const deleted = await postAPI.deletePost(id);
      if (deleted) {
        return {
          success: true,
          message: 'Sample has been created successfully.',
        };
      }
      return {
        success: false,
        message: 'An error occured while deleting the sample.',
      };
    },
  },
  Post: {
    postFiles: ({ id }, args, { loaders }) =>
      loaders.postFileByPostIdLoader.load(id),
  },
  Query: {
    posts: (parent, args, { dataSources }) =>
      dataSources.postAPI.getPostConnection(),
    post: (parent, { id }, { dataSources }) =>
      dataSources.postAPI.getPostById(id),
  },
  MutationResponse: {
    __resolveType: () => {
      // TODO: This __resolveType implementation may need a fix.
      // Need to check how to use it with TypeScript (or graphql-codegen).
      return null;
    },
  },
};

export default resolvers;
