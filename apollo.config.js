module.exports = {
  client: {
    service: {
      name: 'post-gallery',
      localSchemaFile: 'src/generated/graphql.schema.json',
    },
    excludes: ['**/generated/**', '**/gql/**'],
  },
};
