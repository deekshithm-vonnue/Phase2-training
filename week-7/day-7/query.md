# QUERIES

## Retrive open ticket

```
SELECT * FROM TICKET.TICKETS WHERE status ='open';
```

## Retrive high priority

```
SELECT title, description FROM TICKET.TICKETS WHERE priority = 'high';
```

## Update status

```
UPDATE TICKET.TICKETS SET status ='closed' WHERE id=1;
```

```
INSERT INTO TICKET.STATUS_HISTORY(ticket_id,old_status,new_status,reason) VALUES(1,'open','closed','access denied by admin');
```

## Safe deletion
* **ON DELETE CASCADE**  in each foreign key

```
DELETE FROM TICKET.CUSTOMERS WHERE id=2;
```
