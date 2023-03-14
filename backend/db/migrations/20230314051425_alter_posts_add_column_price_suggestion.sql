-- migrate:up
ALTER TABLE posts ADD price_suggestion boolean AFTER view_count;

-- migrate:down

