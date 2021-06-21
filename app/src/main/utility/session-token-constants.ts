import { inProduction, inStaging } from "./environment";

// session_tokens older than 1 day will be invalid
export const POSTGRESQL_INTERVAL_STRING = "1 DAY";

// username & session_token cookies will expire in 1 day
const COOKIE_ONE_DAY_MILLISECONDS = 1000 * 60 * 60 * 24;

export const cookieOptions = { httpOnly: true, sameSite: true, maxAge: COOKIE_ONE_DAY_MILLISECONDS };
