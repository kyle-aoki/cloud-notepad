select * from users;

UPDATE users set session_token = 'AKFSDGJHK', session_token_timestamp = now() where username = 'kyle';

select username from users where username = 'kyle' and session_token = 'asdf' and session_token_timestamp > (now() - INTERVAL '1 day');

DELETE FROM users where username = 'kyle' and session_token = 'fda910b9ab8e70ba508b728c2bd6f1b006792ba7b4ca94074144de9b7d67e96d5c14243f506284e169369709a126b90846b3c96bbf3df6fb77e815586bf4fda4' and session_token_timestamp > (now() - INTERVAL '1 day');
DELETE FROM users where username = 'testuser';
DELETE FROM users where username = 'kyle1';