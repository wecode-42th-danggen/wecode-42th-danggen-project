-- migrate:up
create table admin_post_status (
	id int not null auto_increment primary key,
	admin_post_status varchar(255)
)

-- migrate:down
drop table admin_post_status;
