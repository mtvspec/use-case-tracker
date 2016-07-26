create table statements.d_statement_state (
  id serial,
  state text not null,
    primary key (id),
    unique (state)
);
