DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password CHAR(60) NOT NULL
);

DROP TABLE IF EXISTS total_traffic CASCADE;
CREATE TABLE total_traffic(
    datet DATE NOT NULL,
    weekda SMALLINT NOT NULL,
    total INT NULL,
    hr5 INT NULL,
    hr6 INT NULL,
    hr7 INT NULL,
    hr8 INT NULL,
    hr9 INT NULL,
    hr10 INT NULL,
    hr11 INT NULL,
    hr12 INT NULL,
    hr13 INT NULL,
    hr14 INT NULL,
    hr15 INT NULL,
    hr16 INT NULL,
    hr17 INT NULL,
    hr18 INT NULL,
    hr19 INT NULL,
    hr20 INT NULL,
    hr21 INT NULL,
    hr22 INT NULL,
    hr23 INT NULL,
    hr24 INT NULL
);