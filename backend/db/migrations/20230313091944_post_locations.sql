-- migrate:up
create table post_locations (
	id int not null auto_increment primary key,
	name varchar(255),
	latitude decimal(10,7),
	longitude decimal(10,7)
)

-- migrate:down
drop table post_locations;
