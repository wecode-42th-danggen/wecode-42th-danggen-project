-- migrate:up
ALTER TABLE posts ADD pullup_time datetime not null default current_timestamp AFTER price_suggestion;

-- migrate:down

