DROP SCHEMA IF EXISTS EQUIPMENT CASCADE;

CREATE SCHEMA EQUIPMENT;

CREATE TABLE
    EQUIPMENT.EMPLOYEE (
        employee_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(40) UNIQUE,
        role VARCHAR(20) CHECK (role in ('Staff', 'Technician', 'Supervisior'))
    );

CREATE TABLE
    EQUIPMENT.CATEGORIES (
        category_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        category_name VARCHAR(40) NOT NULL
    );

CREATE TABLE
    EQUIPMENT.EQUIPMENT (
        equipment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        category_id INT REFERENCES EQUIPMENT.CATEGORIES (category_id) ON DELETE RESTRICT,
        model_name VARCHAR(60) NOT NULL,
        status VARCHAR(15) CHECK (status in ('Available', 'Maintenance', 'Retired'))
    );

CREATE TABLE
    EQUIPMENT.MAINTENANCE_RECORDS (
        maintenance_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        equipment_id INT REFERENCES EQUIPMENT.EQUIPMENT (equipment_id) ON DELETE RESTRICT,
        technician_id INT REFERENCES EQUIPMENT.EMPLOYEE (employee_id) ON DELETE RESTRICT,
        maintenance_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        issue_description TEXT NOT NULL,
        maintenance_cost BIGINT
    );

CREATE TABLE
    EQUIPMENT.BOOKINGS (
        booking_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        employee_id INT REFERENCES EQUIPMENT.EMPLOYEE (employee_id) ON DELETE RESTRICT,
        equipment_id INT REFERENCES EQUIPMENT.EQUIPMENT (equipment_id) ON DELETE RESTRICT,
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

CREATE TABLE
    EQUIPMENT.APPROVALS (
        approval_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        booking_id INT REFERENCES EQUIPMENT.BOOKINGS (booking_id) ON DELETE RESTRICT,
        approver_id INT REFERENCES EQUIPMENT.EMPLOYEE (employee_id) ON DELETE RESTRICT,
        status VARCHAR(15) CHECK (status IN ('Approved', 'Denied')),
        action_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        comment TEXT
    );