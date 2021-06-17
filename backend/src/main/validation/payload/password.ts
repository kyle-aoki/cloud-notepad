export default function passwordExists(password: string, location: string) {
  if (!password || typeof password !== "string") {
    throw { type: "PASSWORD_MISSING", message: `Missing string 'password' from ${location}.` };
  }
}
