-- migrate:up
ALTER TABLE accuses ADD community_post_id int AFTER post_id;
ALTER TABLE accuses ADD CONSTRAINT accuses_community_post_id_fk FOREIGN KEY (community_post_id) REFERENCES community_posts(id);

-- migrate:down

