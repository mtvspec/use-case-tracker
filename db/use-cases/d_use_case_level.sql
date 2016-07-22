create table use_cases.d_use_case_level (
  id serial,
  level varchar (1000) not null,
  description varchar (4000),
    create_date timestamp with time zone not null default localtimestamp,
    create_user_id integer not null default 1,
    primary key (id),
    foreign key (create_user_id) references users.e_user (id),
    unique (level),
    unique (description),
    unique (level, description)
);

insert into use_cases.d_use_case_level (level) values ('Black Box');
insert into use_cases.d_use_case_level (level) values ('White Box');
