-- migrate:up
create table community_categories (
	id int not null auto_increment primary key,
  name varchar(255)
)

-- migrate:down
drop table community_categories;
