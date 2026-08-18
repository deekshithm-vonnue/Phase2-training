-- SELECT
--     name
-- FROM
--     EQUIPMENT.EMPLOYEE
-- WHERE
--     role = 'Supervisior';

-- SELECT
--     CATEGORIES.category_name,
--     COUNT(*) AS count
-- FROM
--     EQUIPMENT.CATEGORIES
--     NATURAL JOIN EQUIPMENT.EQUIPMENT
-- GROUP BY
--     category_id,
--     category_name;

-- SELECT
--     model_name,
--     maintenance_cost
-- FROM
--     EQUIPMENT.EQUIPMENT
--     NATURAL JOIN EQUIPMENT.MAINTENANCE_RECORDS
-- WHERE
--     maintenance_cost > 0
-- ORDER BY
--     maintenance_cost DESC
-- LIMIT
--     5;

-- SELECT
--     model_name
-- FROM
--     EQUIPMENT.EQUIPMENT
--     NATURAL JOIN EQUIPMENT.BOOKINGS AS booking
-- WHERE
--     booking.booking_id IN (
--         SELECT
--             booking_id
--         FROM
--             EQUIPMENT.APPROVALS
--         WHERE
--             status = 'Approved'
--     );

-- SELECT
--     SUM(maintenance_cost) AS Total_Maintance_cost
-- FROM
--     EQUIPMENT.MAINTENANCE_RECORDS;

-- SELECT
--     *
-- FROM
--     EQUIPMENT.EQUIPMENT
-- WHERE
--     status = 'Maintenance';

-- SELECT
--     booking_status,
--     COUNT(*)
-- FROM
--     EQUIPMENT.BOOKINGS
-- GROUP BY
--     booking_status
-- ORDER By
--     count(*);

-- SELECT
--     name
-- FROM
--     EQUIPMENT.EMPLOYEE
--     LEFT JOIN EQUIPMENT.BOOKINGS ON EMPLOYEE.employee_id = BOOKINGS.employee_id
-- WHERE
--     booking_id is null
--     AND role = 'Staff';

-- SELECT
--     CATEGORIES.category_id,
--     CATEGORIES.category_name,
--     COUNT(*)
-- FROM
--     EQUIPMENT.CATEGORIES
--     NATURAL JOIN EQUIPMENT.EQUIPMENT
-- GROUP BY
--     category_id,
--     category_name
-- HAVING
--     COUNT(*) >= 3;

-- SELECT
--     EMPLOYEE.name,
--     EQUIPMENT.model_name,
--     COUNT(*) AS total_booking
-- FROM
--     EQUIPMENT.EMPLOYEE
--     NATURAL JOIN EQUIPMENT.BOOKINGS
--     NATURAL JOIN EQUIPMENT.EQUIPMENT
-- GROUP BY
--     EMPLOYEE.employee_id,
--     EMPLOYEE.name,
--     EQUIPMENT.equipment_id,
--     EQUIPMENT.model_name
-- ORDER BY
--     total_booking DESC
-- LIMIT
--     1;

-- -- Transaction
-- BEGIN;

-- INSERT INTO
--     EQUIPMENT.APPROVALS (booking_id, approver_id, status, comment)
-- VALUES
--     (10, 1, 'Approved', 'Use it carefully');

-- SAVEPOINT update_approval;

-- UPDATE EQUIPMENT.BOOKINGS
-- SET
--     booking_status = 'approved'
-- WHERE
--     booking_id = 10;

-- ROLLBACK TO update_approval;

-- UPDATE EQUIPMENT.BOOKINGS
-- SET
--     booking_status = 'Approved'
-- WHERE
--     booking_id = 10;

-- ROLLBACK;

-- EXPLAIN ANALYZE
-- SELECT
--     *
-- FROM
--     EQUIPMENT.BOOKINGS
-- WHERE
--     equipment_id = 1;

-- CREATE INDEX equipment_index ON EQUIPMENT.BOOKINGS (equipment_id);

-- EXPLAIN ANALYZE
-- SELECT
--     *
-- FROM
--     EQUIPMENT.BOOKINGS
-- WHERE
--     equipment_id = 1;


EXPLAIN ANALYZE
SELECT
    *
FROM
    EQUIPMENT.MAINTENANCE_RECORDS
WHERE
    technician_id = 3;

CREATE INDEX technician_index ON EQUIPMENT.MAINTENANCE_RECORDS (technician_id);

EXPLAIN ANALYZE
SELECT
    *
FROM
    EQUIPMENT.MAINTENANCE_RECORDS
WHERE
    technician_id = 3;
