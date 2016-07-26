create table statements.e_statement (
  id serial,
  name text not null,
  description text,
  d_statement_type_id integer not null,
  d_statement_state_id integer not null,
    create_date timestamp with time zone not null default localtimestamp,
    create_user_id integer not null default 1,
      primary key (id),
      foreign key (d_statement_type_id) references statements.d_statement_type (id),
      foreign key (create_user_id) references users.e_user (id)
);