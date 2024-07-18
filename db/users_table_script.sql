CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	username varchar(50) UNIQUE NOT NULL,
	email varchar(50) UNIQUE NOT NULL,
	password text
)