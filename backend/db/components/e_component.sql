create schema components;

create table components.e_component (
  id serial,
  e_component_id integer,
  name varchar (1000) not null,
  description varchar (4000),
  d_type_id integer,
    create_date timestamp with time zone not null default localtimestamp,
    create_user_id integer not null default 1,
    primary key (id),
    foreign key (d_type_id) references components.d_component_type (id),
    foreign key (create_user_id) references users.e_user (id)
);

update components.e_component set name = 'Специальные мероприятия' where id = 5;

insert into components.e_component (name, d_type_id) values ('Единая информационно-аналитическая система', 1);
insert into components.e_component (e_component_id, name, d_type_id) values (1, 'Подсистема хранения данных', 2);
insert into components.e_component (e_component_id, name, d_type_id) values (2, 'Оперативные учеты', 3);
insert into components.e_component (e_component_id, name, d_type_id) values (2, 'Организованные преступные группы', 3);
insert into components.e_component (e_component_id, name, d_type_id) values (2, 'Специальные мероприятия', 3);
insert into components.e_component (e_component_id, name, d_type_id) values (2, 'Наблюдения', 3);
