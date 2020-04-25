import { Router } from 'express';
import { User } from '../../db/entity/User';
import { AuthToken } from '../../db/entity/AuthToken';
import axios from 'axios';

const facebookRouter = Router();

const VERIFY_TOKEN_URL =
  'https://graph.facebook.com/me?fields=id,email,name,gender,picture&access_token=';

facebookRouter.post('/verify', async (req, res) => {
  const { providerToken } = req.body;
  const response = await axios.get(`${VERIFY_TOKEN_URL}${providerToken}`);
  const { data } = response;

  // TODO: Handle errors;
  //   if (!payload) {
  //     return res.json({ success: false });
  //   }

  const facebookProfileId = data.id;

  let foundUser = await User.findOneByFacebookProfileId(facebookProfileId);

  if (!foundUser) {
    // If we don't find the user with the Google Oauth profile id,
    // we create a new user.
    foundUser = new User();
    foundUser.facebookProfileId = facebookProfileId;
    // TODO: Will provide a default displayName algorithm if provider
    // doesn't return a displayName.
    const { email, name, picture } = data;
    foundUser.displayName = name;
    foundUser.email = email;
    foundUser.thumbnailUrl = picture.data.url;
    await foundUser.save();
  }

  const token = await AuthToken.signAndSave(req, foundUser);

  return res.json({ token });
});

export default facebookRouter;
