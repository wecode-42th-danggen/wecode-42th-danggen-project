-- migrate:up
ALTER TABLE posts ADD admin_post_status_id int AFTER post_status_id;
ALTER TABLE posts ADD FOREIGN KEY (admin_post_status_id) REFERENCES admin_post_status(id);

-- migrate:down

