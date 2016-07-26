create table tasks.e_task (
  id serial,
  asignee integer,
  name text not null,
  description text,
    create_date timestamp with time zone not null default localtimestamp,
    create_user_id integer not null default 1,
      primary key (id),
      foreign key (asignee) references persons.e_person (id),
      foreign key (create_user_id) references users.e_user (id)
);

create table tasks.e_task_ch (
  id serial,
  task_id integer not null,
  asignee integer,
  name text not null,
  description text,
    change_date timestamp with time zone not null default localtimestamp,
    change_user_id integer not null default 1,
      primary key (id),
      foreign key (task_id) references tasks.e_task (id),
      foreign key (asignee) references persons.e_person (id),
      foreign key (change_user_id) references users.e_user (id)
);
