import { referDocsite } from "../constants";
import { ErrorMessageObject } from "../types";

/**
 * @apiDefine MissingApiKey
 *
 * @apiError MissingApiKey The api_key header on the request was missing.
 *
 * @apiErrorExample Missing API Key:
 *     HTTP/1.1 401 Not Unauthorized
 *     {
 *       "ok": false,
 *       "message": "Request header 'apikey' must be present on request."
 *     }
 */
const MissingApiKey = (): ErrorMessageObject => {
  const msg = `Request header 'apikey' must be present on request. ${referDocsite}`;
  return { message: msg, statusCode: 401 };
};

export default MissingApiKey;
