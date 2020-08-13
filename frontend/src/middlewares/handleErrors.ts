import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

// https://github.com/zeit/micro#error-handling
const handleErrors = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    return await fn(req, res);
  } catch (err) {
    let status = 500;
    let message = err.message || "Oops, something went wrong!";

    // If it's an axios error,
    // we get the status and message here.
    const data = err.response?.data;
    if (data) {
      status = data.status || status;
      message = data.message || message;
    }

    res.status(status).json({ message });
  }
};

export default handleErrors;
