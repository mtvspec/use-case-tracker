create table use_cases.e_use_case_version (
  id serial,
  version varchar (1000) not null,
  description varchar (4000),
    create_date timestamp with time zone not null default localtimestamp,
    create_user_id integer not null default 1,
    primary key (id),
    foreign key (create_user_id) references users.e_user (id),
    unique (version),
    unique (description),
    unique (version, description)
);

insert into use_cases.e_use_case_version (version) values ('1.0');
insert into use_cases.e_use_case_version (version) values ('2.0');

update use_cases.e_use_case_version set id = 2 where id = 6;
