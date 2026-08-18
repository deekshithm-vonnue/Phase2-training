INSERT INTO
    EQUIPMENT.EMPLOYEE (name, email, role)
VALUES
    ('deekshith', 'deekshith@gmail.com', 'Supervisior');

INSERT INTO
    EQUIPMENT.EMPLOYEE (name, email, role)
VALUES
    ('hawas', 'hawas@gmail.com', 'Staff');

INSERT INTO
    EQUIPMENT.EMPLOYEE (name, email, role)
VALUES
    ('harith', 'hari@gmail.com', 'Technician');

INSERT INTO
    EQUIPMENT.EMPLOYEE (name, email, role)
VALUES
    ('ameesha', 'amee@gmail.com', 'Technician');

INSERT INTO
    EQUIPMENT.EMPLOYEE (name, email, role)
VALUES
    ('akshay', 'askshay@gmail.com', 'Staff');

INSERT INTO
    EQUIPMENT.EMPLOYEE (name, email, role)
VALUES
    ('akku', 'askku@gmail.com', 'Staff');

INSERT INTO
    EQUIPMENT.CATEGORIES (category_name)
VALUES
    ('IT & Computing'),
    ('Audio/Visual'),
    ('Networking & Power'),
    ('Office & Presentation');

INSERT INTO
    EQUIPMENT.EQUIPMENT (category_id, model_name, status)
VALUES
    (1, 'Apple MacBook Pro 16', 'Available'),
    (1, 'Dell XPS 15 Laptop', 'Maintenance'),
    (1, 'iPad Pro 12.9" (Wi-Fi)', 'Retired'),
    (
        2,
        'Sony Alpha a7 IV Mirrorless Camera',
        'Available'
    ),
    (2, 'Canon EOS R5 DSLR Camera', 'Available'),
    (
        2,
        'Rode Wireless GO II Microphone Kit',
        'Maintenance'
    ),
    (
        3,
        'Netgear Nighthawk Portable Wi-Fi Router',
        'Available'
    );

INSERT INTO
    EQUIPMENT.MAINTENANCE_RECORDS (
        equipment_id,
        technician_id,
        maintenance_time,
        issue_description,
        maintenance_cost
    )
VALUES
    (
        2,
        3,
        '2026-08-15 09:00:00',
        'Screen flickering and battery overheating during heavy rendering tests.',
        NULL
    ),
    (
        2,
        3,
        '2026-08-16 10:30:00',
        'Receiver not pairing with transmitter channel B.',
        NULL
    ),
    (
        1,
        4,
        '2026-08-10 14:00:00',
        'Severe water damage reported by user. Logic board completely corroded.',
        NUll
    ),
    (
        1,
        3,
        '2026-05-10 08:00:00',
        'Routine cleaning and thermal paste replacement.',
        45
    ),
    (
        3,
        4,
        '2026-06-01 09:15:00',
        'Broken Keycap on the spacebar.',
        120
    ),
    (
        5,
        4,
        '2026-04-12 11:00:00',
        'Firmware update failure leading to bricked state.',
        0
    ),
    (
        4,
        4,
        '2026-07-20 14:00:00',
        'Sensor dust visible at high apertures.',
        30
    ),
    (
        5,
        4,
        '2026-03-05 10:00:00',
        'SD card slot failing to lock cards in place.',
        85
    ),
    (
        5,
        3,
        '2026-05-22 09:00:00',
        'Firmware update to version 2.01.',
        0
    ),
    (
        7,
        3,
        '2026-01-15 08:30:00',
        'Resetting admin password after user locked it out.',
        0
    ),
    (
        7,
        3,
        '2026-06-18 13:00:00',
        'Unstable Wi-Fi dropouts under heavy load.',
        0
    ),
    (
        2,
        3,
        '2026-02-11 10:00:00',
        'Operating system corrupt boot loop error.',
        50
    ),
    (
        6,
        4,
        '2026-02-28 09:00:00',
        'Loose 3.5mm headphone monitoring jack.',
        25
    );

INSERT INTO
    EQUIPMENT.BOOKINGS (employee_id, equipment_id, booking_status)
VALUES
    (2, 1, 'Approved'),
    (2, 2, 'Pending'),
    (5, 2, 'Approved'),
    (2, 1, 'Rejected'),
    (2, 1, 'Approved'),
    (5, 1, 'Active'),
    (5, 1, 'Completed'),
    (2, 4, 'Pending'),
    (2, 1, 'Approved'),
    (5, 2, 'Pending');

INSERT INTO
    EQUIPMENT.APPROVALS (booking_id, approver_id, status, comment)
VALUES
    (2, 1, 'Approved', 'use for 2 days');

INSERT INTO
    EQUIPMENT.APPROVALS (booking_id, approver_id, status, comment)
VALUES
    (4, 1, 'Denied', 'you cannot use it now');