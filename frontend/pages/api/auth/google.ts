import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { setAuthTokenCookie } from "@/utils";
import handleErrors from "@/middlewares/handleErrors";

interface Response {
  verified: boolean;
}

const verifyGoogle = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) => {
  switch (req.method) {
    case "POST":
      const { idToken } = req.body;
      const { data } = await axios.post(
        `${process.env.API_URL}/auth/google/verify`,
        {
          idToken,
        },
      );
      setAuthTokenCookie(res, data.token);
      res.json({ verified: true });
      break;
    default:
      // Method Not Allowed
      res.status(405).end();
  }
};

export default handleErrors(verifyGoogle);
