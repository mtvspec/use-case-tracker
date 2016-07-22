create table use_cases.e_actor (
  id serial,
  code char (3),
  shortname varchar (100),
  name varchar (1000) not null,
  description varchar (4000),
    create_date timestamp with time zone not null default localtimestamp,
    create_user_id integer not null default 1,
    primary key (id),
    foreign key (create_user_id) references users.e_user (id)
);

insert into use_cases.e_actor (code, shortname, name, description)
select
actor ->> 'code' as code,
actor ->> 'shortname' as shortname,
actor ->> 'name' as name,
actor ->> 'description' as description
from
tmp.actor;
