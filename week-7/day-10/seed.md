# Seeding data

## Employee table

```
INSERT INTO
    EQUIPMENT.EMPLOYEE (name, email, role)
VALUES
    ('deekshith', 'deekshith@gmail.com', 'Supervisior');
```

## Categories table

```
INSERT INTO
    EQUIPMENT.CATEGORIES (category_name)
VALUES
    ('IT & Computing');
```

## Equipment table

```
INSERT INTO
    EQUIPMENT.EQUIPMENT (category_id, model_name, status)
VALUES
    (1, 'Apple MacBook Pro 16', 'Available');
```

## Maintenance table

```
INSERT INTO
    EQUIPMENT.MAINTENANCE_RECORDS (
        equipment_id,
        technician_id,
        maintenance_time,
        issue_description,
        maintenance_cost
    )
VALUES (
        1,
        3,
        '2026-05-10 08:00:00',
        'Routine cleaning and thermal paste replacement.',
        45
    );
```

## Bookings table

```
INSERT INTO
    EQUIPMENT.BOOKINGS (employee_id, equipment_id, booking_status)
VALUES
    (2, 1, 'Approved');
```

## Approvals table

```
INSERT INTO
    EQUIPMENT.APPROVALS (booking_id, approver_id, status, comment)
VALUES
    (2, 1, 'Approved', 'use for 2 days');
```
