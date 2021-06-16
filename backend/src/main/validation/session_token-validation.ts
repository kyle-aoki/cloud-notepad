export default function validateSessionToken(session_token: string) {
  if (!session_token || typeof session_token !== "string") throw "Missing string 'session_token' from request header.";
}
