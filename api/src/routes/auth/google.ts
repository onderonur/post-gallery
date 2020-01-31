import { Router } from 'express';
import GoogleOauth20 from 'passport-google-oauth20';
import passport from 'passport';
import { User } from '../../entity/User';
import { OAuth2Client } from 'google-auth-library';

const encode = (string: string) => Buffer.from(string).toString('base64');

const decode = (base64String: string) =>
  Buffer.from(base64String, 'base64').toString();

const GoogleStrategy = new GoogleOauth20.Strategy(
  {
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, cb) => {
    const { id, name, emails } = profile;

    const foundUser = await User.findByGoogleProfileId(id);

    if (foundUser) {
      return cb(undefined, foundUser);
    }

    // If we don't find the user with the Google Oauth profile id,
    // we create a new user.
    const user = User.create({
      googleProfileId: id,
      firstName: name?.givenName,
      lastName: name?.familyName,
      email: emails?.length && emails.length > 0 ? emails[0].value : undefined,
    });
    await user.save();
    return cb(undefined, user);
  },
);

passport.use(GoogleStrategy);

const googleRouter = Router();

googleRouter.get('/', (req, res, next) => {
  const { redirectURL } = req.query;
  const state = redirectURL
    ? encode(JSON.stringify({ redirectURL }))
    : undefined;

  // If we need Google Refresh token,
  // then we need these two settings too:
  // accessType: 'offline',
  // prompt: 'consent',
  const authenticator = passport.authenticate('google', {
    scope: ['profile', 'email'],
    state,
  });
  authenticator(req, res, next);
});

googleRouter.get(
  '/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
  }),
  (req, res) => {
    const { user } = req;

    if (user instanceof User) {
      const { accessToken, expiresAt } = user.generateAccessToken();

      const { query } = req;
      const { state } = query;
      if (state) {
        const { redirectURL } = JSON.parse(decode(state));
        if (redirectURL) {
          return res.redirect(redirectURL);
        }
      }

      return res.json({ accessToken, expiresAt });
    }

    throw new Error(
      'An error occured while the login process. Please try again.',
    );
  },
);

// https://developers.google.com/identity/sign-in/web/backend-auth#using-a-google-api-client-library
googleRouter.post('/verify', async (req, res) => {
  const { body } = req;
  const { idToken } = body;
  const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
  });
  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error(
      'An error occured while the login process. Please try again.',
    );
  }

  const { sub } = payload;
  let user = await User.findByGoogleProfileId(sub);
  if (!user) {
    const { given_name, family_name, email } = payload;
    user = User.create({
      googleProfileId: sub,
      firstName: given_name,
      lastName: family_name,
      email,
    });
    await user.save();
  }

  const { accessToken, expiresAt } = user.generateAccessToken();
  res.json({ accessToken, expiresAt });
});

export default googleRouter;
