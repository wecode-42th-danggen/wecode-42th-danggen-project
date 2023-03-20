-- migrate:up
ALTER TABLE posts ALTER COLUMN view_count SET DEFAULT 0;

-- migrate:down

