import { Router } from 'express';
import GoogleOauth20 from 'passport-google-oauth20';
import passport from 'passport';

const GoogleStrategy = GoogleOauth20.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      // TODO
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      console.log('profile', profile);
      return cb(undefined, profile);
    },
  ),
);

const authRouter = Router();

authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    accessType: 'offline',
    prompt: 'consent',
  }),
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
  }),
  (req, res) => {
    console.log('user', req.user);
    return res.json({ name: 'ok ok ok' });
  },
);

export { passport };

export default authRouter;
