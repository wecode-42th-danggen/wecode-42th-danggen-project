-- migrate:up
create table users (
	id int not null auto_increment primary key,
	social_id varchar(255),
	social_type_id int,
	email varchar(1000),
	`password` varchar(3000),
	phone_number varchar(255),
	nickname varchar(255),
	profile_image_url varchar(3000),
	user_status_id int,
	created_at timestamp not null default current_timestamp,
	updated_at timestamp null on update current_timestamp,
	constraint user_status_user_status_id_fk foreign key (user_status_id) references user_status (id)
)

-- migrate:down
drop table users;
