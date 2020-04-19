import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import {
  addAuthHeader,
  destroyAuthTokenCookie,
  extractAuthToken,
} from "@/utils";
import handleErrors from "@/middlewares/handleErrors";

interface Response {
  success: true;
}

const logout = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  switch (req.method) {
    case "POST":
      const authToken = extractAuthToken(req.cookies);
      await axios.post(
        `${process.env.API_URL}/auth/logout`,
        {},
        { headers: addAuthHeader({}, authToken) },
      );
      destroyAuthTokenCookie(res);
      res.json({ success: true });
      break;
    default:
      // Method Not Allowed
      res.status(405).end();
  }
};

export default handleErrors(logout);
