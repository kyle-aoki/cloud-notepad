create table users(
  username text primary key,
  password text,
  time_created timestamp default now()
);
