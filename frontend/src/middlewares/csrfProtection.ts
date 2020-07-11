import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import Tokens from "csrf";
import { csrfTokenHeaderKey } from "@/lib/withCSRF";
import { createError } from "@/utils";

const ignoredMethods = ["GET", "HEAD", "OPTIONS"];
const errorMessage = "invalid csrf token";

const csrfProtection = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (ignoredMethods.includes(req.method as string)) {
    return fn(req, res);
  }
  const _csrf = req.cookies._csrf;
  const csrfToken = req.headers[csrfTokenHeaderKey];
  if (!_csrf || !csrfToken || typeof csrfToken !== "string") {
    throw createError(403, errorMessage);
  }
  const tokens = new Tokens();
  const verified = tokens.verify(_csrf, csrfToken);
  if (!verified) {
    throw createError(403, errorMessage);
  }
  return fn(req, res);
};

export default csrfProtection;
