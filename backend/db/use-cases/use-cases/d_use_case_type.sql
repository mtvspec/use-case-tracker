create table use_cases.d_use_case_type (
  id serial,
  type varchar (1000) not null,
  description varchar (4000),
    create_date timestamp with time zone not null default localtimestamp,
    create_user_id integer not null default 1,
    primary key (id),
    foreign key (create_user_id) references users.e_user (id),
    unique (type),
    unique (description),
    unique (type, description)
);

insert into use_cases.d_use_case_type (type) values ('Business use-case');
insert into use_cases.d_use_case_type (type) values ('System use-case');
insert into use_cases.d_use_case_type (type) values ('System (internal) use-case');
insert into use_cases.d_use_case_type (type) values ('Business (internal) use-case');
