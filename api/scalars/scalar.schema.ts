import { gql } from 'apollo-server-micro';

const scalarsSchema = gql`
  scalar Date
  scalar Cursor
  scalar NonNegativeInt
  scalar EmailAddress
`;

export default scalarsSchema;
