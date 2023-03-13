-- migrate:up
create table social_types (
	id int not null auto_increment primary key,
	name varchar(255)
)
-- migrate:down
drop table social_types;
