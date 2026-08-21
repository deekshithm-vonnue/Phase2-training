-- Transaction
BEGIN;

-- Update assignee
UPDATE TICKET.ASSIGNMENTS
SET
    user_id = 2
WHERE
    id = 4;

SAVEPOINT update_assignne;

-- Checkpoint
-- Insert history
INSERT INTO
    TICKET.STATUS_HISTORY (ticket_id, old_status, new_status)
VALUES
    (4, 'open', 'work');

--force rollback When failure occur
ROLLBACK TO update_assignne;

-- Insert history
INSERT INTO
    TICKET.STATUS_HISTORY (ticket_id, old_status, new_status)
VALUES
    (4, 'open', 'working');

-- Add a systen command
INSERT INTO
    TICKET.COMMENTS (comment, author, ticket_id)
VALUES
    ('updated with new assignne', 'admin', 4);

COMMIT;

-- EXPLAIN output before indexing
EXPLAIN ANALYZE
SELECT
    *
FROM
    TICKET.STATUS_HISTORY WHERE ticket_id=1;

-- creating a index
CREATE INDEX ticket_index ON TICKET.STATUS_HISTORY (ticket_id);

-- EXPLAIN output after indexing
EXPLAIN ANALYZE
SELECT
    *
FROM
    TICKET.STATUS_HISTORY WHERE ticket_id=1;