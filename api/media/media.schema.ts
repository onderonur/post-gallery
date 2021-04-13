import { gql } from 'apollo-server-micro';

const mediaSchema = gql`
  type GraphImage {
    width: NonNegativeInt!
    height: NonNegativeInt!
    url: String!
  }

  type GraphMedia {
    id: ID!
    thumbnail: GraphImage!
    smallImage: GraphImage!
    standardImage: GraphImage!
  }
`;

export default mediaSchema;
