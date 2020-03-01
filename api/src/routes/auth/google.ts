import { Router } from 'express';
import GoogleOauth20 from 'passport-google-oauth20';
import passport from 'passport';
import { User } from '../../db/entity/User';
import { toBase64, fromBase64 } from '../../utils';

const GoogleStrategy = new GoogleOauth20.Strategy(
  {
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, cb) => {
    const { id, name, emails, photos } = profile;

    const foundUser = await User.findOneByGoogleProfileId(id);

    if (foundUser) {
      return cb(undefined, foundUser);
    }

    // If we don't find the user with the Google Oauth profile id,
    // we create a new user.
    const user = new User();
    user.googleProfileId = id;
    // TODO: Will provide a default displayName algorithm if provider
    // doesn't return a displayName.
    user.displayName = `${name?.givenName} ${name?.familyName}`;
    user.email = emails?.length ? emails[0].value : undefined;
    user.thumbnailUrl = photos?.length ? photos[0].value : undefined;
    await user.save();
    return cb(undefined, user);
  },
);

passport.use(GoogleStrategy);

const googleRouter = Router();

googleRouter.get('/', (req, res, next) => {
  const { redirectURL } = req.query;
  const state = redirectURL
    ? toBase64(JSON.stringify({ redirectURL }))
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
  }),
  (req, res) => {
    const { user } = req;

    if (user instanceof User) {
      const { query } = req;
      const { state } = query;
      if (state) {
        const { redirectURL } = JSON.parse(fromBase64(state));
        if (redirectURL) {
          return res.redirect(redirectURL);
        }
      }

      return res.redirect('http://localhost:3000/');
    }

    throw new Error(
      'An error occured while the login process. Please try again',
    );
  },
);

export default googleRouter;
