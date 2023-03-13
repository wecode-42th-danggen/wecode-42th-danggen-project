-- migrate:up
create table users_social_types (
	id int not null auto_increment primary key,
	user_id int,
	social_type_id int,
	constraint user_social_types_social_type_id_fk foreign key (social_type_id) references social_types (id),
	constraint user_social_types_user_id_fk foreign key (user_id) references users (id)
)

-- migrate:down
drop table users_social_types;
