export default function validateSessionToken(session_token: string) {
  if (!session_token || typeof session_token !== "string") {
    throw { type: "NOT_LOGGED_IN", message: "Missing 'session_token' cookie." };
  }
}
