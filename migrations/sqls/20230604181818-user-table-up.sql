/* Replace with your SQL commands */
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(150),
  last_name VARCHAR(150),
  user_name VARCHAR(150),
  email VARCHAR(150),
  salt VARCHAR(300),
  password VARCHAR(150)
);