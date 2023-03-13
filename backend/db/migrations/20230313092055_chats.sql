-- migrate:up
create table chats (
	id int not null auto_increment primary key,
	purchase_user_id int,
	content text,
	post_id int,
  created_at timestamp not null default current_timestamp,
	updated_at timestamp null on update current_timestamp,
	constraint chats_purchase_user_id_fk foreign key (purchase_user_id) references users (id),
  constraint chats_post_id_fk foreign key (post_id) references posts (id)
)

-- migrate:down
drop table chats;
