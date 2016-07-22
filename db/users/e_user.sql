create table users.e_user (
  id serial,
  e_person_id serial not null,
    create_date timestamp with time zone not null default localtimestamp,
    primary key (id),
    foreign key (e_person_id) references persons.e_person (id)
);

insert into users.e_user (e_person_id) values (1);
