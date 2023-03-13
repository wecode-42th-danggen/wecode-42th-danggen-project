-- migrate:up
create table accuses (
	id int not null auto_increment primary key,
	user_id int,
	post_id int,
	type_id int,
	constraint accuses_user_id_fk foreign key (user_id) references users (id),
	constraint accuses_post_id_fk foreign key (post_id) references posts (id),
  constraint accuses_type_id_fk foreign key (type_id) references accuse_detail_types (id)
)

-- migrate:down
drop table accues;
