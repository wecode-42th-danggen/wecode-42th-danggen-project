-- migrate:up
ALTER TABLE posts CHANGE title title varchar(1000)

-- migrate:down

