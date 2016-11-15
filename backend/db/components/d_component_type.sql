create table components.d_component_type (
  id serial,
  d_component_type_id integer,
  type varchar (1000) not null,
    create_date timestamp with time zone not null default localtimestamp,
    create_user_id integer not null default 1,
    primary key (id),
    foreign key (d_component_type_id) references components.d_component_type (id),
    foreign key (create_user_id) references users.e_user (id),
    unique (type)
);

insert into components.d_component_type (type) values ('Информационная система');
insert into components.d_component_type (d_component_type_id, type) values (1, 'Подсистема');
insert into components.d_component_type (d_component_type_id, type) values (2, 'Модуль');
