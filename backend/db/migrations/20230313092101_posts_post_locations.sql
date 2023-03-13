-- migrate:up
create table posts_post_locations (
	id int not null auto_increment primary key,
	post_id int,
	post_location_id int,
	constraint posts_post_locations_post_id_fk foreign key (post_id) references posts (id),
  constraint posts_post_locations_post_location_id_fk foreign key (post_location_id) references post_locations (id)
)

-- migrate:down
drop table posts_post_locations
