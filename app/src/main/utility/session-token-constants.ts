import { CookieOptions } from "express";

// username & session_token cookies will expire in 1 day
export const ONE_DAY_MILLISECONDS = 1000 * 60 * 60 * 24;

export const cookieOptions: CookieOptions = {
    httpOnly: true,
    sameSite: true,
    maxAge: ONE_DAY_MILLISECONDS,
};
