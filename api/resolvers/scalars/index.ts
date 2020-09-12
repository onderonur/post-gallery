import { Cursor } from './cursor';
import { date } from './date';
import { NonNegativeIntResolver, EmailAddressResolver } from 'graphql-scalars';
import { Resolvers } from '@api/generated/graphql';

const scalarResolvers: Resolvers = {
  Cursor,
  Date: date,
  NonNegativeInt: NonNegativeIntResolver,
  EmailAddress: EmailAddressResolver,
};

export default scalarResolvers;
