create table use_cases.e_use_case (
  id serial,
  e_component_id integer not null,
  e_actor_id integer not null,
  code char (3),
  name varchar (1000) not null,
  description varchar (4000),
  d_use_case_decision_id integer,
  d_use_case_level_id integer not null,
  d_use_case_type_id integer not null,
  e_use_case_version_id integer not null,
    primary key (id),
    foreign key (e_component_id) references use_cases.e_component (id),
    foreign key (e_actor_id) references use_cases.e_actor (id),
    foreign key (d_use_case_level_id) references use_cases.d_use_case_level (id),
    foreign key (d_use_case_type_id) references use_cases.d_use_case_type (id),
    foreign key (e_use_case_version_id) references use_cases.e_use_case_version (id),
    unique (e_component_id, e_actor_id, code)
);

create view use_cases.v_use_cases
as
select
u.id "ID",
c.name "Component",
a.name "Actor",
u.code "Code",
u.name "Use case",
u.description "Summary",
d.decision "Decision",
l.level "Level",
t.type "Type",
v.version "Version",
concat(p.last_name, ' ', p.first_name, ' ', p.middle_name) "Author"
from
use_cases.e_use_case u,
use_cases.e_component c,
use_cases.e_actor a,
use_cases.d_use_case_decision d,
use_cases.d_use_case_level l,
use_cases.d_use_case_type t,
use_cases.e_use_case_version v,
users.e_user ur,
persons.e_person p
where
u.e_component_id = c.id
and
u.e_actor_id = a.id
and
u.d_use_case_decision_id = d.id
and
u.d_use_case_level_id = l.id
and
u.d_use_case_type_id = t.id
and
u.e_use_case_version_id = v.id
and
ur.e_person_id = p.id
order by
u.id asc;

insert into use_cases.e_use_case (e_component_id, e_actor_id, code, name, description, d_use_case_decision_id, d_use_case_level_id, d_use_case_type_id, e_use_case_version_id)
select
cast(use_case ->> 'component' as int) as e_component_id,
cast(use_case ->> 'actor' as int) as e_actor_id,
use_case ->> 'code' as code,
use_case ->> 'name' as name,
use_case ->> 'description' as description,
cast(use_case ->> 'decision'as int) as d_use_case_decision_id,
cast(use_case ->> 'level' as int) as d_use_case_level_id,
cast(use_case ->> 'type' as int) as d_use_case_type_id,
cast(use_case ->> 'version'as int) as e_use_case_version_id
from
use_case;

select
id,
use_case ->> 'name' as name,
use_case ->> 'description' as description
from
use_case
where
use_case ->> 'component' = '15'
and
use_case ->> 'actor' = '1'
and
use_case ->> 'code' = '005';

update use_case set use_case =
  '{
    "component": 15,
    "actor": 2,
    "code": "005",
    "name": "Просмотреть ОКК",
    "description": "UC предназначен для обеспечения просмотра ОКК",
    "decision": 2,
    "level": 1,
    "type": 2,
    "version": 2
  }'
where id = 249;

select
use_case ->> 'name',
count (*)
from
use_case
where
count (*) = 2
group by
use_case ->> 'name';

select
id,
use_case ->> 'name' as name
from
use_case
where
id between 360 and 380;
