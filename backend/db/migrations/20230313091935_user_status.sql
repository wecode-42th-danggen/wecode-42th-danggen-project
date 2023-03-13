-- migrate:up
create table user_status (
	id int not null auto_increment primary key,
	user_status varchar(10)
)

-- migrate:down
drop table user_status
