DROP SCHEMA IF EXISTS TICKET CASCADE;

CREATE SCHEMA TICKET;

CREATE TABLE
    TICKET.USERS (
        id INT PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
    );

CREATE TABLE
    TICKET.CUSTOMERS (
        id INT PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
    );

CREATE TABLE
    TICKET.CATEGORIES (id INT PRIMARY KEY, category VARCHAR(30));

CREATE TABLE
    TICKET.TICKETS (
        id INT PRIMARY KEY,
        title VARCHAR(30),
        description TEXT,
        status VARCHAR(10),
        customer_id INT NOT NULL,
        category_id INT,
        FOREIGN KEY (customer_id) REFERENCES TICKET.CUSTOMERS(id),
        FOREIGN KEY (category_id) REFERENCES TICKET.CATEGORIES(id)
    );

CREATE TABLE
    TICKET.ASSIGNMENTS (
        id INT PRIMARY KEY,
        ticket_id INT,
        user_id INT,
        FOREIGN KEY (ticket_id) REFERENCES TICKET.TICKETS (id),
        FOREIGN KEY (user_id) REFERENCES TICKET.USERS (id)
    );
CREATE TABLE
    TICKET.COMMENTS (
        id INT PRIMARY KEY,
        comment TEXT,
        author VARCHAR(20),
        ticket_id INT,
        FOREIGN KEY (ticket_id) REFERENCES TICKET.TICKETS (id)
    );

CREATE TABLE
    TICKET.STATUS_HISTORY (
        id INT PRIMARY KEY,
        old_status VARCHAR(20),
        new_status VARCHAR(20),
        reason TEXT
    );


