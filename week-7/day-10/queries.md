# Queries

## Ten queries

1. **Find employee who role is supervision**

```
SELECT
    name
FROM
    EQUIPMENT.EMPLOYEE
WHERE
    role = 'Supervisior';
```

2. **Count number of equipments in each category**

```
SELECT
    CATEGORIES.category_name,
    COUNT(*) AS count
FROM
    EQUIPMENT.CATEGORIES
    NATURAL JOIN EQUIPMENT.EQUIPMENT
GROUP BY
    category_id,
    category_name;
```

3. **Determine top 5 maintenance cost for an equipment**

```
SELECT
    model_name,
    maintenance_cost
FROM
    EQUIPMENT.EQUIPMENT
    NATURAL JOIN EQUIPMENT.MAINTENANCE_RECORDS
WHERE
    maintenance_cost > 0
ORDER BY
    maintenance_cost DESC
LIMIT
    5;
```

4. **Retrive equipment which gets approval**

```
SELECT
    model_name
FROM
    EQUIPMENT.EQUIPMENT
    NATURAL JOIN EQUIPMENT.BOOKINGS AS booking
WHERE
    booking.booking_id IN (
        SELECT
            booking_id
        FROM
            EQUIPMENT.APPROVALS
        WHERE
            status = 'Approved'
    );
```

5. **Find total maintance cost of equipment**

```
SELECT
    SUM(maintenance_cost) AS Total_Maintance_cost
FROM
    EQUIPMENT.MAINTENANCE_RECORDS;
```

6. **Find the equipment under maintanance**

```
SELECT
    *
FROM
    EQUIPMENT.EQUIPMENT
WHERE
    status = 'Maintenance';
```

7. **Count the booking status with lowest at the first**

```
SELECT
    booking_status,
    COUNT(*)
FROM
    EQUIPMENT.BOOKINGS
GROUP BY
    booking_status
ORDER By
    count(*);
```

8. **Find Staff with no booking**

```
SELECT
    name
FROM
    EQUIPMENT.EMPLOYEE
    LEFT JOIN EQUIPMENT.BOOKINGS ON EMPLOYEE.employee_id = BOOKINGS.employee_id
WHERE
    booking_id is null
    AND role = 'Staff';
```

9. **Find category with more than 3 equipment**

```
SELECT
    CATEGORIES.category_id,
    CATEGORIES.category_name,
    COUNT(*)
FROM
    EQUIPMENT.CATEGORIES
    NATURAL JOIN EQUIPMENT.EQUIPMENT
GROUP BY
    category_id,
    category_name
HAVING
   COUNT(*)>=3
```

10. **Find single employee and equipment model combination that has the highest number of bookings**

```
SELECT
    EMPLOYEE.name,
    EQUIPMENT.model_name,
    COUNT(*) AS total_booking
FROM
    EQUIPMENT.EMPLOYEE
    NATURAL JOIN EQUIPMENT.BOOKINGS
    NATURAL JOIN EQUIPMENT.EQUIPMENT
GROUP BY
    EMPLOYEE.employee_id,
    EMPLOYEE.name,
    EQUIPMENT.equipment_id,
    EQUIPMENT.model_name
ORDER BY
    total_booking DESC
LIMIT
    1;
```

## Transaction

- **Insert Approvals and update bookings**

```
BEGIN;

INSERT INTO
    EQUIPMENT.APPROVALS (booking_id, approver_id, status, comment)
VALUES
    (10, 1, 'Approved', 'Use it carefully');

SAVEPOINT update_approval;

UPDATE EQUIPMENT.BOOKINGS
SET
    booking_status = 'approved'
WHERE
    booking_id = 10;

ROLLBACK TO update_approval;

UPDATE EQUIPMENT.BOOKINGS
SET
    booking_status = 'Approved'
WHERE
    booking_id = 10;

COMMIT;
```

## Index

### **Create index for equipment_id on bookings table**

```
CREATE INDEX equipment_index ON EQUIPMENT.BOOKINGS (equipment_id);
```

#### Justification

- **Before indexing**

```
EXPLAIN ANALYZE
SELECT
    *
FROM
    EQUIPMENT.BOOKINGS
WHERE
    equipment_id = 1;
```

```
                                             QUERY PLAN
----------------------------------------------------------------------------------------------------
 Seq Scan on bookings  (cost=0.00..20.38 rows=4 width=70) (actual time=0.015..0.018 rows=6 loops=1)
   Filter: (equipment_id = 1)
   Rows Removed by Filter: 4
 Planning Time: 0.057 ms
 Execution Time: 0.031 ms
(5 rows)
```

- **After indexing**

```
EXPLAIN ANALYZE
SELECT
    *
FROM
    EQUIPMENT.BOOKINGS
WHERE
    equipment_id = 1;
```

```
                                            QUERY PLAN
---------------------------------------------------------------------------------------------------
 Seq Scan on bookings  (cost=0.00..1.12 rows=1 width=70) (actual time=0.010..0.012 rows=6 loops=1)
   Filter: (equipment_id = 1)
   Rows Removed by Filter: 4
 Planning Time: 0.222 ms
 Execution Time: 0.027 ms
(5 rows)
```

### **Create index for technician_id on maintanance_records table**

```
CREATE INDEX technician_index ON EQUIPMENT.MAINTENANCE_RECORDS (technician_id);
```

#### Justification

- **Before indexing**

```
EXPLAIN ANALYZE
SELECT
    *
FROM
    EQUIPMENT.MAINTENANCE_RECORDS
WHERE
    technician_id = 3;
```

```
                                                  QUERY PLAN
---------------------------------------------------------------------------------------------------------------
 Seq Scan on maintenance_records  (cost=0.00..21.50 rows=5 width=60) (actual time=0.013..0.016 rows=7 loops=1)
   Filter: (technician_id = 3)
   Rows Removed by Filter: 6
 Planning Time: 0.344 ms
 Execution Time: 0.058 ms
(5 rows)
```

- **After indexing**

```
EXPLAIN ANALYZE
SELECT
    *
FROM
    EQUIPMENT.MAINTENANCE_RECORDS
WHERE
    technician_id = 3;
```

```
                                                  QUERY PLAN
--------------------------------------------------------------------------------------------------------------
 Seq Scan on maintenance_records  (cost=0.00..1.16 rows=1 width=60) (actual time=0.010..0.013 rows=7 loops=1)
   Filter: (technician_id = 3)
   Rows Removed by Filter: 6
 Planning Time: 0.225 ms
 Execution Time: 0.028 ms
(5 rows)
```
