export const POSTGRESQL_INTERVAL_STRING = "1 DAY";

const COOKIE_ONE_DAY_MILLISECONDS = 1000 * 60 * 60 * 24;
export const cookieOptions = { httpOnly: true, sameSite: true, maxAge: COOKIE_ONE_DAY_MILLISECONDS };
