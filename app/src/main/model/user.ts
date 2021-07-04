export interface User {
  username: string;
  hashedPassword: string;
  session_token: string | null;
  session_token_creation_timestamp: string | null;
}
