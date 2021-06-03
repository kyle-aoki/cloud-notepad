create table users(
  username text,
  password text,
  time_created timestamp default now(),
  session_token text,
  session_token_timestamp TIMESTAMP
);
