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


CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    start_time TIME,
    end_time TIME,
    ph_poll_interval INT,
    dht_poll_interval INT
);

ALTER TABLE profiles
ADD min_ph FLOAT,
ADD max_ph FLOAT,
ADD min_temp FLOAT,
ADD max_temp FLOAT,
ADD min_humd FLOAT,
ADD max_humd FLOAT;