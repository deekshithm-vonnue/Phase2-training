-- SEEDING USERS
INSERT INTO
    TICKET.USERS (name, email)
VALUES
    ('deekshith', 'deekshith1902@gmail.com');

INSERT INTO
    TICKET.USERS (name, email)
VALUES
    ('rida', 'rida@gmail.com');

INSERT INTO
    TICKET.USERS (name, email)
VALUES
    ('abhinav', 'abhi@gmail.com');

-- -- SEEDING CUSTOMERS
INSERT INTO
    TICKET.CUSTOMERS (name, email)
VALUES
    ('hawas', 'hawas@vonnuw.com');

INSERT INTO
    TICKET.CUSTOMERS (name, email)
VALUES
    ('harith', 'harith@gmail,com');

INSERT INTO
    TICKET.CUSTOMERS (name, email)
VALUES
    ('gokul', 'gokul@gmail,com');

INSERT INTO
    TICKET.CUSTOMERS (name, email)
VALUES
    ('aparna', 'aparana.h@gmail,com');

-- --  SEEDING CATEGORIES
INSERT INTO
    TICKET.CATEGORIES (category)
VALUES
    ('Technical');

INSERT INTO
    TICKET.CATEGORIES (category)
VALUES
    ('General');

-- --  SEEDING TICKETS
INSERT INTO
    TICKET.TICKETS (
        title,
        description,
        priority,
        status,
        customer_id,
        category_id
    )
VALUES
    (
        'issue in sudo access',
        'sudo command is not working',
        'low',
        'open',
        1,
        1
    );

INSERT INTO
    TICKET.TICKETS (
        title,
        description,
        priority,
        status,
        customer_id,
        category_id
    )
VALUES
    (
        'issue in slack',
        'slack not providing notification',
        'medium',
        'working',
        1,
        1
    );

INSERT INTO
    TICKET.TICKETS (
        title,
        description,
        priority,
        status,
        customer_id,
        category_id
    )
VALUES
    (
        'issue in discord',
        'Cannot create new server',
        'low',
        'open',
        1,
        1
    );

INSERT INTO
    TICKET.TICKETS (
        title,
        description,
        priority,
        status,
        customer_id,
        category_id
    )
VALUES
    (
        'issue in active coding',
        'description of active coding time',
        'high',
        'open',
        2,
        1
    );

INSERT INTO
    TICKET.TICKETS (
        title,
        description,
        priority,
        status,
        customer_id,
        category_id
    )
VALUES
    (
        'issue in sudo access',
        'sudo command is not working',
        'high',
        'open',
        1,
        1
    );

INSERT INTO
    TICKET.TICKETS (
        title,
        description,
        priority,
        status,
        customer_id,
        category_id
    )
VALUES
    (
        'issue in active coding',
        'description of active coding time',
        'high',
        'closed',
        2,
        1
    );

INSERT INTO
    TICKET.TICKETS (
        title,
        description,
        priority,
        status,
        customer_id,
        category_id
    )
VALUES
    (
        'issue in active coding',
        'description of active coding time',
        'high',
        'open',
        1,
        2
    );

INSERT INTO
    TICKET.TICKETS (
        title,
        description,
        priority,
        status,
        customer_id,
        category_id
    )
VALUES
    (
        'Buffer in video',
        'After each 1 minutes buferring happening',
        'high',
        'open',
        1,
        2
    );

-- -- SEEDING ASSIGNMENTS
INSERT INTO
    TICKET.ASSIGNMENTS (ticket_id, user_id)
VALUES
    (1, 1);

INSERT INTO
    TICKET.ASSIGNMENTS (ticket_id, user_id)
VALUES
    (2, 2);

INSERT INTO
    TICKET.ASSIGNMENTS (ticket_id, user_id)
VALUES
    (3, 1);

INSERT INTO
    TICKET.ASSIGNMENTS (ticket_id, user_id)
VALUES
    (4, 1);

-- -- SEEDING COMMENTS
INSERT INTO
    TICKET.COMMENTS (comment, author, ticket_id)
VALUES
    ('Today it will get resloved', 'gokul', 1);

-- -- SEEDING STATUS_HISTORY
INSERT INTO
    TICKET.STATUS_HISTORY (ticket_id, old_status, new_status, reason)
VALUES
    (
        1,
        'open',
        'working',
        'restricted the sudo access by admin'
    );

INSERT INTO
    TICKET.STATUS_HISTORY (ticket_id, old_status, new_status, reason)
VALUES
    (
        1,
        'open',
        'working',
        'restricted the sudo access by admin'
    );

INSERT INTO
    TICKET.STATUS_HISTORY (ticket_id, old_status, new_status, reason)
VALUES
    (
        1,
        'open',
        'working',
        'restricted the sudo access by admin'
    );

INSERT INTO
    TICKET.STATUS_HISTORY (ticket_id, old_status, new_status, reason)
VALUES
    (
        1,
        'open',
        'working',
        'restricted the sudo access by admin'
    );

INSERT INTO
    TICKET.STATUS_HISTORY (ticket_id, old_status, new_status, reason)
VALUES
    (
        1,
        'open',
        'working',
        'restricted the sudo access by admin'
    );

INSERT INTO
    TICKET.STATUS_HISTORY (ticket_id, old_status, new_status, reason)
VALUES
    (
        1,
        'open',
        'working',
        'restricted the sudo access by admin'
    );

INSERT INTO
    TICKET.STATUS_HISTORY (ticket_id, old_status, new_status, reason)
VALUES
    (
        1,
        'open',
        'working',
        'restricted the sudo access by admin'
    );

INSERT INTO
    TICKET.STATUS_HISTORY (ticket_id, old_status, new_status, reason)
VALUES
    (
        1,
        'open',
        'working',
        'restricted the sudo access by admin'
    );

INSERT INTO
    TICKET.STATUS_HISTORY (ticket_id, old_status, new_status, reason)
VALUES
    (
        1,
        'open',
        'working',
        'restricted the sudo access by admin'
    );

INSERT INTO
    TICKET.STATUS_HISTORY (ticket_id, old_status, new_status, reason)
VALUES
    (
        1,
        'open',
        'working',
        'restricted the sudo access by admin'
    );

INSERT INTO
    TICKET.STATUS_HISTORY (ticket_id, old_status, new_status, reason)
VALUES
    (
        1,
        'open',
        'working',
        'restricted the sudo access by admin'
    );

INSERT INTO
    TICKET.STATUS_HISTORY (ticket_id, old_status, new_status, reason)
VALUES
    (
        1,
        'open',
        'working',
        'restricted the sudo access by admin'
    );

INSERT INTO
    TICKET.STATUS_HISTORY (ticket_id, old_status, new_status, reason)
VALUES
    (
        1,
        'open',
        'working',
        'restricted the sudo access by admin'
    );

INSERT INTO
    TICKET.STATUS_HISTORY (ticket_id, old_status, new_status, reason)
VALUES
    (
        1,
        'open',
        'working',
        'restricted the sudo access by admin'
    );

INSERT INTO
    TICKET.STATUS_HISTORY (ticket_id, old_status, new_status, reason)
VALUES
    (
        1,
        'open',
        'working',
        'restricted the sudo access by admin'
    );

INSERT INTO
    TICKET.STATUS_HISTORY (ticket_id, old_status, new_status, reason)
VALUES
    (
        2,
        'open',
        'working',
        'restricted the sudo access by admin'
    );