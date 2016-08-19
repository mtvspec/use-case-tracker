create view stakeholders.v_stakeholders
as
select
p.first_name ||' '|| p.last_name "Заинтересованное лицо",
s.description "Описание"
from
stakeholders.e_stakeholder s,
persons.e_person p
where
s.e_person_id = p.id
order by
s.id asc;
