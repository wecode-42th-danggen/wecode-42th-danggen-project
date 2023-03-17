-- migrate:up
ALTER TABLE posts_post_locations DROP FOREIGN KEY posts_post_locations_post_id_fk;
ALTER TABLE posts_post_locations DROP FOREIGN KEY posts_post_locations_post_location_id_fk;
DROP TABLE post_locations;
DROP TABLE posts_post_locations;
ALTER TABLE posts ADD `location` varchar(1000) AFTER `description`;

-- migrate:down

