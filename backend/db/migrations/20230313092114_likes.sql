-- migrate:up
create table likes (
	id int not null auto_increment primary key,
  user_id int,
	post_id int,
	constraint likes_post_id_fk foreign key (post_id) references posts (id),
  constraint likes_user_id_fk foreign key (user_id) references users (id)
)

-- migrate:down
drop table likes;
