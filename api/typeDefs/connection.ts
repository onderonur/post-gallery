import { gql } from 'apollo-server-micro';

const connectionSchema = gql`
  # TODO: This needs a "__resolveType" resolver.
  interface Connection {
    pageInfo: PageInfo!
  }

  type PageInfo {
    endCursor: Cursor
    hasNextPage: Boolean!
  }
`;

export default connectionSchema;
