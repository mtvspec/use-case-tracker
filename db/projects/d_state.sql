create table projects.d_state (
  id serial,
  state varchar (1000) not null,
    primary key (id),
    unique (state)
);

insert into projects.d_state (state) values ('Новый');
