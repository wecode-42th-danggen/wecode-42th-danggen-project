-- migrate:up
create table chat_rooms (
	id int not null auto_increment primary key,
  post_id int,
  created_at timestamp not null default current_timestamp,
	updated_at timestamp null on update current_timestamp,
	constraint chat_rooms_post_id_fk foreign key (post_id) references posts (id)
)

-- migrate:down
drop table chat_rooms;
