export default function usernameExists(username: string, location: string) {
  if (!username || typeof username !== "string") {
    throw { type: "NOT_LOGGED_IN", message: `Missing 'username' from ${location}.` };
  }
}
