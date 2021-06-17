export default function usernameExists(username: string, location: string) {
  if (!username || typeof username !== "string") {
    throw { type: "USERNAME_MISSING", message: `Missing 'username' from ${location}.` };
  }
}
