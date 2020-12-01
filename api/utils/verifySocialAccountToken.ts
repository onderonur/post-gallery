import { UserModel } from '@api/db/knex';
import { SocialAccountType } from '@api/generated/graphql';
import { ID } from '@api/types';
import { fetcher } from '@shared/fetcher';
import { ApolloError } from 'apollo-server-micro';
import { goTry } from 'go-try';
import { OAuth2Client } from 'google-auth-library';
import { nanoid } from 'nanoid';
import { BadRequestError } from './httpErrors';

const generateRandomDisplayName = () => `User-${nanoid(8)}`;

const verifyFacebookTokenUrl =
  'https://graph.facebook.com/me?fields=id,email,name,picture&access_token=';

type VerifySocialAccountFn = (
  token: string,
) => Promise<
  Pick<UserModel, 'displayName' | 'email' | 'thumbnailUrl'> & {
    profileId: ID;
  }
>;

const verifyGoogleToken: VerifySocialAccountFn = async (token: string) => {
  const client = new OAuth2Client(
    process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  );

  const { error, data: ticket } = await goTry(() =>
    client.verifyIdToken({
      idToken: token,
      audience: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
    }),
  );
  if (error || !ticket) {
    throw new BadRequestError("Couldn't verify social account token");
  }

  const payload = ticket.getPayload();

  if (!payload) {
    throw new ApolloError("Couldn't get profile info");
  }

  const { sub, given_name, family_name, email, picture } = payload;

  if (!email) {
    throw new ApolloError('E-mail not found');
  }

  const displayName =
    given_name && family_name
      ? `${given_name} ${family_name}`
      : generateRandomDisplayName();

  return {
    profileId: sub,
    displayName,
    email,
    thumbnailUrl: picture,
  };
};

const verifyFacebookToken: VerifySocialAccountFn = async (token: string) => {
  const { id, name, email, picture } = await fetcher.get(
    `${verifyFacebookTokenUrl}${token}`,
  );

  return {
    profileId: id,
    displayName: name || generateRandomDisplayName(),
    email,
    thumbnailUrl: picture.data.url,
  };
};

export const verifySocialAccountToken = async (input: {
  socialAccountType: SocialAccountType;
  token: string;
}) => {
  const { socialAccountType, token } = input;
  switch (socialAccountType) {
    case SocialAccountType.Google:
      return verifyGoogleToken(token);
    case SocialAccountType.Facebook:
      return verifyFacebookToken(token);
    default:
      throw new BadRequestError('Social account type is not valid');
  }
};
