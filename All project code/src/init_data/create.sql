-- DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password CHAR(60) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL
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

--time is inserted in hh:mm:ss format


CREATE TABLE IF NOT EXISTS traffic (
  roomid INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  weekda SMALLINT NOT NULL,
  open TIME NULL,
  close TIME NULL,
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

CREATE TABLE IF NOT EXISTS traffic_day (
  roomid INT NOT NULL,
  datet DATE NOT NULL,
  name VARCHAR(50) NOT NULL,
  weekda SMALLINT NOT NULL,
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

CREATE TABLE IF NOT EXISTS user_favorites (
  user_favorites_id SERIAL PRIMARY KEY,   /* the primary key for each entry */
  user_id SMALLINT NOT NULL,
  roomid SMALLINT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (roomid) REFERENCES traffic(roomid)
);
