-- migrate:up
create table users_user_locations (
	id int not null auto_increment primary key,
	user_id int,
	user_location_id int,
	constraint users_user_locations_user_id_fk foreign key (user_id) references users (id),
	constraint users_user_locations_user_location_id_fk foreign key (user_location_id) references user_locations (id)
)

-- migrate:down
drop table users_user_locations;
