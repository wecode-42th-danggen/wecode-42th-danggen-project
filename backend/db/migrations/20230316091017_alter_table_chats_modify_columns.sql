-- migrate:up
SET FOREIGN_KEY_CHECKS=0;
ALTER TABLE chats ADD room_id int AFTER id;
ALTER TABLE chats ADD CONSTRAINT chats_room_id_fk FOREIGN KEY (room_id) REFERENCES chat_rooms (id);
ALTER TABLE chats DROP FOREIGN KEY chats_post_id_fk;
ALTER TABLE chats DROP post_id;
ALTER TABLE chats CHANGE COLUMN purchase_user_id user_id int DEFAULT NULL AFTER id;
SET FOREIGN_KEY_CHECKS=1;


-- migrate:down

