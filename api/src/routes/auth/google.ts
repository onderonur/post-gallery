import { Router } from 'express';
import GoogleOauth20 from 'passport-google-oauth20';
import passport from 'passport';
import { User } from '../../entity/User';

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

googleRouter.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    // Required for refresh token
    // accessType: 'offline',
    // Required for refresh token
    // prompt: 'consent',
  }),
);

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
      return res.json({ accessToken, expiresAt });
    }

    throw new Error(
      'An error occured while the login process. Please try again.',
    );
  },
);

export default googleRouter;
