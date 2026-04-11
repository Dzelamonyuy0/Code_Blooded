-- psql postgres

CREATE DATABASE party_db;

CREATE TABLE parties (
    id SERIAL PRIMARY KEY,
    school VARCHAR(50),
    house VARCHAR(100),
    address VARCHAR(255),
    party_date DATE
);

\c party_db

\copy parties(school, house, address, party_date) FROM 'path/to/your/parties.csv' DELIMITER ',' CSV;

SELECT * FROM parties;