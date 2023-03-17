-- migrate:up
create table community_comments (
	id int not null auto_increment primary key,
  user_id int,
	community_post_id int,
	content varchar(3000),
	constraint community_comments_community_post_id_fk foreign key (community_post_id) references community_posts (id),
  constraint community_comments_user_id_fk foreign key (user_id) references users (id)
)

-- migrate:down
drop table community_comments;
