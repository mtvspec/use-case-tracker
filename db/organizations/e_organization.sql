create table organizations.e_organization (
  id serial,
  bin char (12),
  name varchar (1000) not null,
    cr_date timestamp with time zone not null default localtimestamp,
    primary key (id),
    unique (bin)
);
