import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import {
  destroyAuthTokenCookie,
  extractAuthToken,
  authHeaderKey,
  getAuthHeaderValue,
} from "@/utils";
import handleErrors from "@/middlewares/handleErrors";

interface Response {
  success: true;
}

const logout = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  switch (req.method) {
    case "POST":
      const headers: Record<string, string> = {};
      const authToken = extractAuthToken(req.cookies);
      if (authToken) {
        headers[authHeaderKey] = getAuthHeaderValue(authToken);
      }
      await axios.post(`${process.env.API_URL}/auth/logout`, {}, { headers });
      destroyAuthTokenCookie(res);
      res.json({ success: true });
      break;
    default:
      // Method Not Allowed
      res.status(405).end();
  }
};

export default handleErrors(logout);
