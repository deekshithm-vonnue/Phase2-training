DROP SCHEMA IF EXISTS support_tickets CASCADE;

CREATE SCHEMA support_tickets;

CREATE TABLE
    support_tickets.users (
        id serial PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        email VARCHAR(100)
    );

CREATE TABLE
    support_tickets.tickets (
        id serial PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        Description TEXT NOT NULL,
        priority VARCHAR(20) CHECK (priority IN ('low', 'medium', 'high')),
        status VARCHAR(20) CHECK (status IN ('open', 'working', 'closed')),
        assignee_id INT REFERENCES support_tickets.USERS (id) ON DELETE RESTRICT
    );