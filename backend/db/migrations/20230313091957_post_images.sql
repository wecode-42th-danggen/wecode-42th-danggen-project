-- migrate:up
create table post_images (
	id int not null auto_increment primary key,
	image_url varchar(3000)
)

-- migrate:down
drop table post_images;
