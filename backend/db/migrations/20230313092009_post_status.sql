-- migrate:up
create table post_status (
	id int not null auto_increment primary key,
	post_status varchar(255)
)

-- migrate:down
drop table posts_status;
