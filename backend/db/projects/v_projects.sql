create view projects.v_projects as
select
  c.name "Заказчик",
  p.name "Наименование",
  p.description "Описание",
  m.last_name "Фамилия",
  m.first_name "Имя",
  m.middle_name "Отчество"
from
  organizations.e_organization c,
  projects.e_project p,
  persons.e_person m
where
  p.customer_id = c.id
and
  p.project_manager_id = m.id
order by
  p.name asc;
