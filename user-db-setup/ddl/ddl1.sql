create table users(
  username text,
  password text unique,
  time_created timestamp default now(),
  session_token text,
  session_token_timestamp TIMESTAMP
);
