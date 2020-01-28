import { Router } from 'express';
import GoogleOauth20 from 'passport-google-oauth20';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const GoogleStrategy = new GoogleOauth20.Strategy(
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
);

passport.use(GoogleStrategy);

const googleRouter = Router();

googleRouter.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    accessType: 'offline',
    prompt: 'consent',
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
    console.log('user', user);
    const token = jwt.sign(
      {
        user,
      },
      accessTokenSecret,
      { expiresIn: '1h' },
    );
    return res.json({ token });
  },
);

export { passport };

export default googleRouter;
