-- migrate:up
create table categories (
	id int not null auto_increment primary key,
	name varchar(255)
)

-- migrate:down
drop table categories;
