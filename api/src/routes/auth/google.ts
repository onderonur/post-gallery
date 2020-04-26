import { Router } from 'express';
import { OAuth2Client, LoginTicket } from 'google-auth-library';
import { User } from '../../db/entity/User';
import { AuthToken } from '../../db/entity/AuthToken';
import { Maybe } from '../../generated/graphql';
import { asyncHandler } from '../../middlewares';

const googleRouter = Router();

// https://developers.google.com/identity/sign-in/web/backend-auth
googleRouter.post(
  '/verify',
  asyncHandler(async (req, res) => {
    const { providerToken } = req.body;
    const client = new OAuth2Client(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    );

    let ticket: Maybe<LoginTicket>;
    try {
      ticket = await client.verifyIdToken({
        idToken: providerToken,
        audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
      });
    } catch {
      return res.json({ success: false });
    }

    const payload = ticket.getPayload();

    if (!payload) {
      return res.json({ success: false });
    }

    const googleProfileId = payload.sub;

    let foundUser = await User.findOneByGoogleProfileId(googleProfileId);

    if (!foundUser) {
      // If we don't find the user with the Google Oauth profile id,
      // we create a new user.
      foundUser = new User();
      foundUser.googleProfileId = googleProfileId;
      // TODO: Will provide a default displayName algorithm if provider
      // doesn't return a displayName.
      const { given_name, family_name, email, picture } = payload;

      if (!email) {
        throw new Error("Couldn't find an e-mail to create your account.");
      }

      foundUser.displayName = `${given_name} ${family_name}`;
      foundUser.email = email;
      foundUser.thumbnailUrl = picture;
      await foundUser.save();
    }

    const token = await AuthToken.signAndSave(req, foundUser);

    return res.json({ token });
  }),
);

export default googleRouter;
