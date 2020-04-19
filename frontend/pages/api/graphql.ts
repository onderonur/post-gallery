import { extractAuthToken, AUTH_HEADER_KEY, getAuthHeaderValue } from "@/utils";
import csrfProtection from "@/middlewares/csrfProtection";
import proxy from "@/middlewares/proxy";

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
