import { extractAuthToken, AUTH_HEADER_KEY, getAuthHeaderValue } from "@/utils";
import csrfProtection from "@/middlewares/csrfProtection";
import proxy from "@/middlewares/proxy";

// Note about CORS:
// https://nextjs.org/docs/api-routes/introduction
// API Routes do not specify CORS headers, meaning they are same-origin only by default.
// You can customize such behavior by wrapping the request handler with the cors middleware.

export const config = {
  api: {
    bodyParser: false,
  },
};

export default csrfProtection(
  proxy({
    target: process.env.API_URL,
    pathRewrite: { "^/api": "" },
    onProxyReq: (proxyReq, req, res) => {
      const authToken = extractAuthToken(req.cookies);
      if (authToken) {
        proxyReq.setHeader(AUTH_HEADER_KEY, getAuthHeaderValue(authToken));
      }
    },
  }),
);
