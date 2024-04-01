-- psql -U postgres -f init.sql

CREATE DATABASE environment;

-- Connect to the new database
\c environment;

-- Create a table in the new database
CREATE TABLE data (
    id SERIAL PRIMARY KEY,
    time TIMESTAMP DEFAULT NOW(),
    temp FLOAT,
    humd FLOAT,
    ph FLOAT,
    light BOOLEAN
);
