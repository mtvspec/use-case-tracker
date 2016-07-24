create table stakeholders.e_stakeholder (
  id serial,
  e_person_id integer not null,
  description varchar (4000),
    create_date timestamp with time zone not null default localtimestamp,
    create_user_id integer not null default 1,
      primary key (id),
      unique (e_person_id),
      foreign key (e_person_id) references persons.e_person (id)
);
