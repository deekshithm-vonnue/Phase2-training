SELECT * FROM  TICKET.CUSTOMERS;

SELECT * FROM TICKET.TICKETS WHERE status ='open';

SELECT title, description FROM TICKET.TICKETS WHERE priority = 'high';

UPDATE TICKET.TICKETS SET status ='closed' WHERE id=1;
INSERT INTO TICKET.STATUS_HISTORY(ticket_id,old_status,new_status,reason) VALUES(1,'open','closed','access denied by admin');

DELETE FROM TICKET.CUSTOMERS WHERE id=2;


