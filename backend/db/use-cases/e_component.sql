create table use_cases.e_component (
  id serial,
  e_component_id integer,
  code char (3),
  name varchar (1000) not null,
  description varchar (4000),
    create_date timestamp with time zone not null default localtimestamp,
    create_user_id integer not null default 1,
    primary key (id),
    foreign key (e_component_id) references components.e_component (id),
    foreign key (create_user_id) references users.e_user (id)
);

update use_cases.e_component set code = '001' where id = 71;

insert into use_cases.e_component (code, name) values (1, '001', 'Учет конфиденциальных помощников');
insert into use_cases.e_component (code, name) values (1, '002', 'Учет оперативной информации');
insert into use_cases.e_component (code, name) values (1, '003', 'Учет дел оперативного учета');
insert into use_cases.e_component (code, name) values (1, '004', 'Учет дел негласных следственных действий');
insert into use_cases.e_component (code, name) values (1, '005', 'Учет дел досудебного расследования');
insert into use_cases.e_component (code, name) values (1, '006', 'Учет общих оперативно-розыскных мероприятий');
insert into use_cases.e_component (code, name) values ('007', 'Учет объектов оперативной заинтресованности');
insert into use_cases.e_component (code, name) values ('008', 'Учет командировок');
insert into use_cases.e_component (code, name) values ('009', 'Учет справок');
insert into use_cases.e_component (code, name) values ('010', 'Учет конспиративных организаций');
insert into use_cases.e_component (code, name) values ('011', 'Учет денежных средств');
insert into use_cases.e_component (code, name) values ('012', 'Учет сотрудников');
insert into use_cases.e_component (code, name) values ('013', 'Физические лица');
insert into use_cases.e_component (code, name) values ('014', 'Юридические лица');
insert into use_cases.e_component (code, name) values ('015', 'Объекты');
insert into use_cases.e_component (code, name) values ('016', 'Отчет агентурно-оперативной деятельности');
insert into use_cases.e_component (code, name) values ('017', 'Досье на фигуранта');
insert into use_cases.e_component (code, name) values ('018', 'Администрирование пользователей');
insert into use_cases.e_component (code, name) values ('019', 'Администрирование справочников');
insert into use_cases.e_component (code, name) values ('020', 'Журнал использования системы');
insert into use_cases.e_component (code, name) values ('001', 'Учет организованных преступных групп');
insert into use_cases.e_component (code, name) values ('002', 'Учет членов организованных преступных групп') returning id;
insert into use_cases.e_component (code, name) values ('003', 'Привлечения членов ОПГ к УО') returning id;
insert into use_cases.e_component (code, name) values ('004', 'Учет подконтрольных компаний ОПГ') returning id;
insert into use_cases.e_component (code, name) values ('005', 'Привлечения ПК к УО') returning id;
insert into use_cases.e_component (code, name) values ('006', 'Учет информации по обналичиванию') returning id;
insert into use_cases.e_component (code, name) values ('006', 'Учет информации по обналичиванию') returning id;
insert into use_cases.e_component (code, name) values ('007', 'Бывшие наименования ПК') returning id;
insert into use_cases.e_component (code, name) values ('008', 'Бывшие адреса ПК') returning id;
insert into use_cases.e_component (code, name) values ('009', 'Руководители ПК') returning id;
insert into use_cases.e_component (code, name) values ('010', 'Учредители ПК') returning id;
insert into use_cases.e_component (code, name) values ('011', 'Реорганизации ПК') returning id;
insert into use_cases.e_component (code, name) values ('012', 'Банковские реквизиты') returning id;
insert into use_cases.e_component (code, name) values ('013', 'Текущие счета') returning id;
insert into use_cases.e_component (code, name) values ('014', 'Адреса ККМ') returning id;
insert into use_cases.e_component (code, name) values ('015', 'Учет основных клиентов-контрагентов ОПГ') returning id;
insert into use_cases.e_component (code, name) values ('016', 'Учет покровителей ОПГ') returning id;
insert into use_cases.e_component (code, name) values ('017', 'Учет сотрудников') returning id;
insert into use_cases.e_component (code, name) values ('018', 'Физические лица') returning id;
insert into use_cases.e_component (code, name) values ('019', 'Юридические лица') returning id;
insert into use_cases.e_component (code, name) values ('020', 'Объекты') returning id;
insert into use_cases.e_component (code, name) values ('021', 'Отчет о ОПГ') returning id;
insert into use_cases.e_component (code, name) values ('022', 'Администрирование пользователей') returning id;
insert into use_cases.e_component (code, name) values ('023', 'Импорт бывших наименований ПК') returning id;
insert into use_cases.e_component (code, name) values ('024', 'Импорт бывших адресов ПК') returning id;
insert into use_cases.e_component (code, name) values ('025', 'Импорт руководителей ПК') returning id;
insert into use_cases.e_component (code, name) values ('026', 'Импорт учредителей ПК') returning id;
insert into use_cases.e_component (code, name) values ('027', 'Журнал использования системы') returning id;
insert into use_cases.e_component (code, name) values ('001', 'СМ-1') returning id;
insert into use_cases.e_component (code, name) values ('002', 'СМ-2') returning id;
insert into use_cases.e_component (code, name) values ('003', 'СМ-3') returning id;
insert into use_cases.e_component (code, name) values ('004', 'СМ-4') returning id;
insert into use_cases.e_component (code, name) values ('005', 'СМ-6') returning id;
insert into use_cases.e_component (code, name) values ('006', 'Учет специальных технических средств') returning id;
insert into use_cases.e_component (code, name) values ('007', 'Учет сотрудников') returning id;
insert into use_cases.e_component (code, name) values ('008', 'Физические лица') returning id;
insert into use_cases.e_component (code, name) values ('009', 'Отчет по СМ') returning id;
insert into use_cases.e_component (code, name) values ('010', 'Администрирование пользователей') returning id;
insert into use_cases.e_component (code, name) values ('011', 'Администрирование справочников') returning id;
insert into use_cases.e_component (code, name) values ('012', 'Журнал использования системы') returning id;
insert into use_cases.e_component (code, name) values ('001', 'Н-1') returning id;
insert into use_cases.e_component (code, name) values ('002', 'Н-2') returning id;
insert into use_cases.e_component (code, name) values ('003', 'ИС') returning id;
insert into use_cases.e_component (code, name) values ('004', 'П') returning id;
insert into use_cases.e_component (code, name) values ('005', 'У') returning id;
insert into use_cases.e_component (code, name) values ('006', 'Учет сотрудников') returning id;
insert into use_cases.e_component (code, name) values ('007', 'Физические лица') returning id;
insert into use_cases.e_component (code, name) values ('008', 'Отчет о Н') returning id;
insert into use_cases.e_component (code, name) values ('009', 'Администрирование пользователей') returning id;
insert into use_cases.e_component (code, name) values ('010', 'Администрирование справочников') returning id;
insert into use_cases.e_component (code, name) values ('011', 'Журнал использования системы') returning id;
insert into use_cases.e_component (code, name) values ('012', 'Администрирование системы') returning id;
insert into use_cases.e_component (code, name) values ('001', 'Экспорт данных в центр') returning id;
insert into use_cases.e_component (code, name) values ('002', 'Импорт данных из территориальных подразделений') returning id;
insert into use_cases.e_component (code, name) values ('003', 'Экспорт справочников в территориальные подразделения') returning id;
insert into use_cases.e_component (code, name) values ('004', 'Импорт справочников из центра') returning id;
insert into use_cases.e_component (code, name) values ('005', 'Экспорт пользователей в территориальные подразделения') returning id;
insert into use_cases.e_component (code, name) values ('006', 'Импорт пользователей из центра') returning id;
insert into use_cases.e_component (code, name) values ('007', 'Импорт физических лиц') returning id;
insert into use_cases.e_component (code, name) values ('008', 'Импорт юридических лиц') returning id;

insert into use_cases.e_component
select
component ->> 'code' as code,
component ->> 'name' as name,
component ->> 'description' as description
from
component;

create table use_cases.r_components (
  id serial,
  e_component_id integer not null,
  e_use_cases_component_id integer not null,
    create_date timestamp with time zone not null default localtimestamp,
    create_user_id integer not null default 1,
    primary key (id),
    foreign key (e_component_id) references components.e_component (id),
    foreign key (e_use_cases_component_id) references use_cases.e_component (id)
);

select
count (*)
from
use_cases.e_component
where e_component_id = 1;
