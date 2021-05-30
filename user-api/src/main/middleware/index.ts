import withCatchAsyncError from "../async-catch";
import ApiKeyAuthentication from "./api-key-authentication";
import SessionTokenAuthorization from "./session-token-authorization";
import ValidateRequestSchema from "./validate-request-schema";

const MiddlewareList = [ApiKeyAuthentication, SessionTokenAuthorization, ValidateRequestSchema];

const Middleware = withCatchAsyncError(MiddlewareList);

export default Middleware;
