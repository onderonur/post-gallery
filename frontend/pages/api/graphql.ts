import { createProxyMiddleware } from "http-proxy-middleware";
import { NextApiRequest, NextApiResponse } from "next";
import { addAuthHeader, extractAuthToken } from "@/utils";
import csrfProtection from "@/middlewares/csrfProtection";
import runMiddleware from "@/middlewares/runMiddleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      const authToken = extractAuthToken(req.cookies);

      // Run the middleware
      await runMiddleware(
        req,
        res,
        // https://www.npmjs.com/package/http-proxy-middleware#example
        createProxyMiddleware({
          target: process.env.API_URL,
          pathRewrite: { "^/api": "" },
          headers: addAuthHeader({}, authToken),
        }),
      );

      // Rest of the API logic
      res.end();
      break;
    default:
      // Method Not Allowed
      res.status(405).end();
  }
}

export default csrfProtection(handler);
