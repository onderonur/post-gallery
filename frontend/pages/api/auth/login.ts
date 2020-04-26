import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { setAuthTokenCookie } from "@/utils";
import handleErrors from "@/middlewares/handleErrors";
import { Maybe } from "@/generated/graphql";
import authProviders from "@/constants/authProviders";

interface ProviderResponse {
  token: string;
}

interface Response {
  verified: boolean;
}

const login = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  switch (req.method) {
    case "POST":
      const { provider, providerToken } = req.body;
      const input = { providerToken };
      let url: Maybe<string>;
      switch (provider) {
        case authProviders.google:
          url = `${process.env.API_URL}/auth/google/verify`;
          break;
        case authProviders.facebook:
          url = `${process.env.API_URL}/auth/facebook/verify`;
          break;
      }

      if (!url) {
        return res.json({ verified: false });
      }

      const providerResponse = await axios.post<ProviderResponse>(url, input, {
        // We are also forwarding the headers.
        // So that API can find things like "user-agent" etc.
        // And log users info when they are logging in.
        headers: req.headers,
      });

      const { token } = providerResponse.data;
      setAuthTokenCookie(res, token);
      res.json({ verified: true });
      break;
    default:
      // Method Not Allowed
      res.status(405).end();
  }
};

export default handleErrors(login);
