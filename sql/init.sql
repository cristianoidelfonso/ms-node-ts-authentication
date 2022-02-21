CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS application_users(
  uuid UUID DEFAULT uuid_generate_v4(),
  userName VARCHAR(100) NOT NULL,
  password VARCHAR(32) NOT NULL,
  PRIMARY KEY (uuid)
);

INSERT INTO application_users(username, password) VALUES ('admin', crypt('admin', 'my_salt') );