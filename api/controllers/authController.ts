import { NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';
import { setAuthTokenCookie, destroyAuthTokenCookie } from '@api/utils/auth';
import { DecodedJwt } from '@api/types';
import { SocialAccountType } from '@api/generated/graphql';
import { BadRequestError } from '@api/utils/httpErrors';
import { verifySocialAccountToken } from '@api/utils/verifySocialAccountToken';
import { to } from '@shared/to';

type LoginResponse = {
  success: true;
};

const login: NextApiHandler = async (req, res) => {
  if (req.viewer) {
    throw new BadRequestError('You are already logged in');
  }

  const { socialAccountType, token } = req.body;
  const { db } = req;
  const verifiedProfile = await verifySocialAccountToken({
    socialAccountType,
    token,
  });
  let foundUser, googleProfileId, facebookProfileId;
  switch (socialAccountType) {
    case SocialAccountType.Google:
      googleProfileId = verifiedProfile.profileId;
      foundUser = await db.user.findOneByGoogleProfileId(googleProfileId);
      break;
    case SocialAccountType.Facebook:
      facebookProfileId = verifiedProfile.profileId;
      foundUser = await db.user.findOneByFacebookProfileId(facebookProfileId);
      break;
  }

  const { displayName, email, thumbnailUrl } = verifiedProfile;

  if (!foundUser) {
    // Checking if there is a user with the same email
    foundUser = await db.user.findOneByEmail(email);

    if (foundUser) {
      switch (socialAccountType) {
        case SocialAccountType.Google:
          foundUser.googleProfileId = googleProfileId;
          break;
        case SocialAccountType.Facebook:
          foundUser.facebookProfileId = facebookProfileId;
          break;
      }
      foundUser = await db.user.patch(foundUser.id, foundUser);
    } else {
      // Creating the user for the first time
      foundUser = await db.user.create({
        displayName,
        email,
        thumbnailUrl,
        googleProfileId,
        facebookProfileId,
      });
    }
  }

  const { useragent } = req;
  const authToken = await db.authToken.signAndSaveToken(useragent, foundUser);

  setAuthTokenCookie(res, authToken);

  return res.json({ success: true });
};

type LogoutRespone = LoginResponse;

const logout: NextApiHandler<LogoutRespone> = async (req, res) => {
  // First, we destroy the authToken cookie.
  destroyAuthTokenCookie(res);

  const { viewer, authToken } = req;
  if (!viewer || !authToken) {
    return res.json({ success: true });
  }

  const decodedToken = jwt.decode(authToken);
  const { jti } = decodedToken as DecodedJwt;
  const { db } = req;

  // If the authToken can not be deleted from DB,
  // we don't throw and error.
  // We just end the request. We already deleted
  // the cookie from the request.
  // This method might be handled with details in future.
  await to(db.authToken.deleteByJti(jti));

  return res.json({ success: true });
};

const authController = { login, logout };

export default authController;
