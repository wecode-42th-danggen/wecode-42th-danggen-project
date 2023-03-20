-- migrate:up
create table community_likes (
	id int not null auto_increment primary key,
  user_id int,
	community_post_id int,
	constraint community_likes_post_id_fk foreign key (community_post_id) references community_posts (id),
  constraint community_likes_user_id_fk foreign key (user_id) references users (id)
)

-- migrate:down
drop table community_likes;
