-- migrate:up
create table accuse_detail_types (
	id int not null auto_increment primary key,
	type_id int,
	detail_type varchar(255),
	constraint accuse_detail_types_type_id_fk foreign key (type_id) references accuse_types (id)
)

-- migrate:down
drop table accuse_detail_types;
