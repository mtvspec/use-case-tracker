create table projects.e_project (
  id serial,
  customer_id integer,
  name varchar (1000) not null,
  description varchar (4000),
  project_manager_id integer,
  state_id integer not null,
    cr_date timestamp with time zone not null default localtimestamp,
    primary key (id),
    unique (name),
    unique (description),
    foreign key (customer_id) references organizations.e_organization (id),
    foreign key (project_manager_id) references persons.e_person (id),
    foreign key (state_id) references projects.d_state (id)
);
