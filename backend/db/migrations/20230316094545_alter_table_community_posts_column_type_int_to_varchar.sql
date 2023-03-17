-- migrate:up
ALTER TABLE community_posts CHANGE title title varchar(1000)

-- migrate:down

