create table statements.d_statement_type (
  id serial,
  type_ru varchar (1000) not null,
  type_en varchar (1000),
    create_date timestamp with time zone not null default localtimestamp,
    create_user_id integer not null default 1,
      primary key (id),
      unique (type),
      foreign key (create_user_id) references users.e_user (id),
      is_deleted char(1) not null default 'N'
);

insert into statements.d_statement_type (type_ru, type_en) values ('Бизнес-проблема', 'Business Problem');
insert into statements.d_statement_type (type_ru, type_en) values ('Бизнес-цель', 'Business Objective');
insert into statements.d_statement_type (type_ru, type_en) values ('Бизнес-требование', 'Business Requirement');
insert into statements.d_statement_type (type_ru, type_en) values ('Бизнес правило', 'Business Rule');
insert into statements.d_statement_type (type_ru, type_en) values ('Решение', 'Solution');
