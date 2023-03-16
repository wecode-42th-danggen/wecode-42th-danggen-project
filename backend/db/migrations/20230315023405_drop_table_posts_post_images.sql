-- migrate:up
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE posts_post_images;
ALTER TABLE post_images ADD post_id int AFTER id;
ALTER TABLE post_images ADD CONSTRAINT post_images_post_id_fk FOREIGN KEY (post_id) REFERENCES posts(id);
SET FOREIGN_KEY_CHECKS=1;

-- migrate:down

