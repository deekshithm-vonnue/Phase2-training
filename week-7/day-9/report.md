# REPORT

## Ticket count by status and assignee

```
SELECT
    status,
    USERS.name,
    COUNT(TICKETS.id)
FROM
    TICKET.TICKETS
    JOIN TICKET.ASSIGNMENTS ON TICKET.TICKETS.id = TICKET.ASSIGNMENTS.ticket_id
    JOIN TICKET.USERS ON TICKET.ASSIGNMENTS.user_id = TICKET.USERS.id
GROUP BY
    status,
    user_id,
    USERS.name;
```

## Customers with more than five open tickets

```
SELECT
    CUSTOMERS.name,
    COUNT(*)
FROM
    TICKET.CUSTOMERS
    JOIN TICKET.TICKETS ON TICKET.CUSTOMERS.id = TICKET.TICKETS.customer_id
WHERE
    status = 'open'
GROUP by
    customer_id,
    CUSTOMERS.name
HAVING
    COUNT(customer_id) >= 5;
```

## Users with no assigned tickets

```
SELECT
    USERS.*
FROM
    TICKET.USERS
    LEFT JOIN TICKET.ASSIGNMENTS ON TICKET.USERS.id = TICKET.ASSIGNMENTS.user_id
WHERE
    ticket_id is null;
```

## Oldest unresolved ticket

```
SELECT
    TICKETS.*
FROM
    TICKET.TICKETS
WHERE
    status != 'closed'
ORDER BY
    created_at
LIMIT
    1;
```

## Counts by category and priority

```
SELECT
    CATEGORIES.category AS category,
    priority,
    COUNT(*)
FROM
    TICKET.TICKETS
    JOIN TICKET.CATEGORIES ON TICKET.TICKETS.category_id = TICKET.CATEGORIES.id
GROUP BY
    CATEGORIES.id,
    CATEGORIES.category,
    priority;
```
