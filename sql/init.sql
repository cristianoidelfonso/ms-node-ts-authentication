CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcripto";

CREATE TABLE IF NOT EXISTS application_user(
  uuid UUID DEFAULT uuid_generate_v4(),
  userName VARCHAR(100) NOT NULL,
  password VARCHAR(32) NOT NULL,
  PRIMARY KEY (uuid)
);

INSERT INTO application_user(username, password) VALUES ('admin', crypt('admin', 'my_salt') );