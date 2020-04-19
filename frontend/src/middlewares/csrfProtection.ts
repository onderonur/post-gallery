import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import Tokens from "csrf";
import { CSRF_TOKEN_HEADER_KEY } from "@/lib/withCSRF";

const IGNORED_METHODS = ["GET", "HEAD", "OPTIONS"];
const ERROR_MESSAGE = "invalid csrf token";

const csrfProtection = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (IGNORED_METHODS.includes(req.method as string)) {
    return fn(req, res);
  }
  const _csrf = req.cookies._csrf;
  const csrfToken = req.headers[CSRF_TOKEN_HEADER_KEY];
  if (!_csrf || !csrfToken || typeof csrfToken !== "string") {
    throw Error(ERROR_MESSAGE);
  }
  const tokens = new Tokens();
  const verified = tokens.verify(_csrf, csrfToken);
  if (!verified) {
    throw Error(ERROR_MESSAGE);
  }
  return fn(req, res);
};

export default csrfProtection;
