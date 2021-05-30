select * from users;

UPDATE users set session_token = 'AKFSDGJHK', session_token_timestamp = now() where username = 'kyle';

select username from users where username = 'kyle' and session_token = 'asdf' and session_token_timestamp > (now() - INTERVAL '1 day');
