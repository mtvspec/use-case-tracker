create table use_cases.d_use_case_decision (
  id serial,
  decision varchar (1000),
    primary key (id),
    unique (decision)
);

insert into use_cases.d_use_case_decision (id, decision) values (0, 'Без изменений');
insert into use_cases.d_use_case_decision (id, decision) values (1, 'Разработка');
insert into use_cases.d_use_case_decision (id, decision) values (2, 'Модернизация');
insert into use_cases.d_use_case_decision (id, decision) values (3, 'Удаление');
