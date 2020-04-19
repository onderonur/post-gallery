import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { setAuthTokenCookie, AUTH_PROVIDERS } from "@/utils";
import handleErrors from "@/middlewares/handleErrors";
import { Maybe } from "@/generated/graphql";

interface Response {
  verified: boolean;
}

const verifyGoogle = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) => {
  switch (req.method) {
    case "POST":
      const { provider, providerToken } = req.body;
      let token: Maybe<string>;
      switch (provider) {
        case AUTH_PROVIDERS.google:
          const googleResponse = await axios.post(
            `${process.env.API_URL}/auth/google/verify`,
            { idToken: providerToken },
          );
          token = googleResponse.data.token;
          break;
        case AUTH_PROVIDERS.facebook:
          const facebookResponse = await axios.post(
            `${process.env.API_URL}/auth/facebook/verify`,
            { accessToken: providerToken },
          );
          token = facebookResponse.data.token;
          break;
        default:
      }
      if (!token) {
        return res.json({ verified: false });
      }
      setAuthTokenCookie(res, token);
      res.json({ verified: true });
      break;
    default:
      // Method Not Allowed
      res.status(405).end();
  }
};

export default handleErrors(verifyGoogle);
