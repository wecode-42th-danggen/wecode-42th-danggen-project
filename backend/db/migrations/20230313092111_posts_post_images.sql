-- migrate:up
create table posts_post_images (
	id int not null auto_increment primary key,
	post_id int,
	post_image_id int,
	constraint posts_post_images_post_id_fk foreign key (post_id) references posts (id),
  constraint posts_post_images_post_image_id_fk foreign key (post_image_id) references posts_post_images (id)
)

-- migrate:down
drop table posts_post_images;
