CREATE DATABASE todo_database;

-- \c into_database

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);