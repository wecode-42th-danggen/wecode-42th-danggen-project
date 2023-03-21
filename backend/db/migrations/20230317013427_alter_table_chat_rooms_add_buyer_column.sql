-- migrate:up
ALTER TABLE chat_rooms ADD buyer_id int AFTER post_id;
ALTER TABLE chat_rooms ADD CONSTRAINT chat_rooms_buyer_id_fk FOREIGN KEY (buyer_id) REFERENCES users (id);


-- migrate:down

