import { gql } from 'apollo-server-express';

const connectionSchema = gql`
  # TODO: This needs a "__resolveType" resolver.
  interface Connection {
    totalCount: Int!
    pageInfo: PageInfo!
  }

  type PageInfo {
    endCursor: Cursor
    hasNextPage: Boolean!
  }
`;

export default connectionSchema;
