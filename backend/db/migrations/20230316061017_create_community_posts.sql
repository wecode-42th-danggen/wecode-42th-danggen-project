-- migrate:up
create table community_posts (
	id int not null auto_increment primary key,
  user_id int,
  title int,
	image_url varchar(3000),
	description varchar(3000),
	view_count int,
	category_id int,
  created_at timestamp not null default current_timestamp,
	updated_at timestamp null on update current_timestamp,
  constraint community_posts_category_id_fk foreign key (category_id) references community_categories (id),
	constraint community_posts_user_id_fk foreign key (user_id) references users (id)
)

-- migrate:down
drop table community_posts;
