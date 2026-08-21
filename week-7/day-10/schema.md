# Equipment Booking System Database 

## Create Schema

```
CREATE SCHEMA EQUIPMENT;
```

## Drop schema if exist

```
DROP SCHEMA IF EXISTS EQUIPMENT CASCADE;
```

## Create Employee Table

```
CREATE TABLE
    EQUIPMENT.EMPLOYEE (
        employee_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(40) UNIQUE,
        role VARCHAR(20) CHECK (role in ('Staff', 'Technician', 'supervisior'))
    );
```

## Create Categories Table

```
CREATE TABLE
    EQUIPMENT.CATEGORIES (
        category_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(40) NOT NULL
    );
```

## Create Equipment Table

```
CREATE TABLE
    EQUIPMENT.EQUIPMENT (
        equiment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        category_id INT REFERENCES EQUIPMENT.CATEGORIES (category_id) ON DELETE RESTRICT,
        model_name VARCHAR(30) NOT NULL,
        status VARCHAR(15) CHECK (status in ('Available', 'Maintenance', 'Retired'))
    );
```

## Create Maintance_Records Table

```
CREATE TABLE
    EQUIPMENT.MAINTENANCE_RECORDS (
        maintenance_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        equiment_id INT REFERENCES EQUIPMENT.EQUIPMENT (equiment_id) ON DELETE RESTRICT,
        technician_id INT REFERENCES EQUIPMENT.EMPLOYEE (employee_id) ON DELETE RESTRICT,
        maintenance_time TIMESTAMPTZ NOT NULL,
        issue_description TEXT NOT NULL,
        maintenance_cost BIGINT
    );
```

## Create Bookings Table

```
CREATE TABLE
    EQUIPMENT.BOOKINGS (
        booking_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        employee_id INT REFERENCES EQUIPMENT.EMPLOYEE (employee_id) ON DELETE RESTRICT,
        equiment_id INT REFERENCES EQUIPMENT.EQUIPMENT (equiment_id) ON DELETE RESTRICT,
        booking_status VARCHAR(20) CHECK (
            booking_status in (
                'Pending',
                'Approved',
                'Rejected',
                'Active',
                'Completed'
            )
        )
    );
```

## Create Approvals Table

```
CREATE TABLE
    EQUIPMENT.APPROVALS (
        approval_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        booking_id INT REFERENCES EQUIPMENT.BOOKINGS (booking_id) ON DELETE RESTRICT,
        approver_id INT REFERENCES EQUIPMENT.EMPLOYEE (employee_id) ON DELETE RESTRICT,
        status VARCHAR(15) CHECK (status IN ('Approved', 'Denied')),
        action_date TIMESTAMPTZ,
        comment TEXT
    );
```