import { ErrorMessageObject } from "../types";

/**
 * @apiDefine IncorrectApiKey
 *
 * @apiError IncorrectApiKey The api_key header on the request was incorrect.
 *
 * @apiErrorExample Incorrect API Key:
 *     HTTP/1.1 401 Not Unauthorized
 *     {
 *       "ok": false,
 *       "message": "Incorrect API Key. You may obtain an api-key from the onboarding form on '/documentation'."
 *     }
 */
const IncorrectApiKey = (): ErrorMessageObject => {
  const msg = `Incorrect API Key. You may obtain an api-key from the onboarding form on '/documentation'.`;
  return { statusCode: 401, message: msg };
};

export default IncorrectApiKey;
