DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password CHAR(60) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);