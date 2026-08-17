# SEEDING TICKET MANAGEMENT SYSTEM

## SEEDING USERS

```
INSERT INTO TICKET.USERS(name,email) VALUES ('deekshith','deekshith1902@gmail.com');
```

## SEEDING CUSTOMERS

```
INSERT INTO TICKET.CUSTOMERS(name,email) VALUES('hawas','hawas@vonnuw.com');
```

## SEEDING CATEGORIES

```
INSERT INTO TICKET.CATEGORIES(category) VALUES ('Technical');
```

## SEEDING TICKETS

```
INSERT INTO TICKET.TICKETS(title,description,priority,status,customer_id,category_id) VALUES ('issue in sudo access','sudo command is not working','low','open',1,1);
```

## SEEDING COMMENTS

```
INSERT INTO TICKET.COMMENTS(comment,author,ticket_id) VALUES ('Today it will get resloved','gokul',1);
```

## SEEDING STATUS_HISTORY

```
INSERT INTO TICKET.STATUS_HISTORY(ticket_id,old_status,new_status,reason) VALUES (1,'open','working','restricted the sudo access by admin');
```