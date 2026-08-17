DROP SCHEMA IF EXISTS TICKET CASCADE;

CREATE SCHEMA TICKET;

CREATE TABLE
    TICKET.USERS (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
    );

CREATE TABLE
    TICKET.CUSTOMERS (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
    );

CREATE TABLE
    TICKET.CATEGORIES (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        category VARCHAR(30) CHECK (category IN ('Technical','General'))
    );

CREATE TABLE
    TICKET.TICKETS (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        title VARCHAR(30),
        description TEXT,
        priority VARCHAR(10) CHECK (priority IN ('low', 'medium', 'high')),
        status VARCHAR(10) CHECK (status IN ('open', 'working', 'closed')),
        customer_id INT NOT NULL,
        category_id INT,
        FOREIGN KEY (customer_id) REFERENCES TICKET.CUSTOMERS (id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES TICKET.CATEGORIES (id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    TICKET.ASSIGNMENTS (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        ticket_id INT,
        user_id INT,
        FOREIGN KEY (ticket_id) REFERENCES TICKET.TICKETS (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES TICKET.USERS (id) ON DELETE CASCADE
    );

CREATE TABLE
    TICKET.COMMENTS (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        comment TEXT,
        author VARCHAR(20),
        ticket_id INT,
        FOREIGN KEY (ticket_id) REFERENCES TICKET.TICKETS (id) ON DELETE CASCADE
    );

CREATE TABLE
    TICKET.STATUS_HISTORY (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        ticket_id INT,
        old_status VARCHAR(10) CHECK (old_status IN ('open', 'working', 'closed')),
        new_status VARCHAR(10) CHECK (new_status IN ('open', 'working', 'closed')),
        reason TEXT,
        FOREIGN KEY (ticket_id) REFERENCES TICKET.TICKETS (id) ON DELETE CASCADE
    );