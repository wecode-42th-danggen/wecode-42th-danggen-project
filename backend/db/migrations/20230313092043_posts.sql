-- migrate:up
create table posts (
	id int not null auto_increment primary key,
	user_id int,
	title int,
	price decimal(10,2),
	description varchar(3000),
	hidden boolean,
	view_count int,
	category_id int,
	post_status_id int,
  created_at timestamp not null default current_timestamp,
	updated_at timestamp null on update current_timestamp,
	constraint posts_category_id_fk foreign key (category_id) references categories (id),
	constraint posts_post_status_id_fk foreign key (post_status_id) references post_status (id),
	constraint posts_user_id_fk foreign key (user_id) references users (id)
)

-- migrate:down
drop table posts;
