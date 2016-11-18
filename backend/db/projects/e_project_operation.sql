--============================================================================--
-- Project Operations
--============================================================================--
CREATE TABLE projects.d_project_operation (
  id SERIAL,
  operation_en VARCHAR (1000) NOT NULL,
  operation_ru VARCHAR (1000),
  operation_kz VARCHAR (1000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    cr_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (
        id
      ),
      UNIQUE (
        operation_en
      ),
      UNIQUE (
        operation_ru
      ),
      UNIQUE (
        operation_kz
      ),
      UNIQUE (
        operation_en,
        operation_ru,
        operation_kz
      )
);
--------------------------------------------------------------------------------
INSERT INTO
  projects.e_project_operation (
    operation_en
  )
VALUES
(
  'Create project'
),
(
  'Start project'
),
(
  'Suspend project'
),
(
  'Renew project'
),
(
  'Close project'
),
(
  'Archieve project'
),
(
  'Reject project'
),
(
  'Delete project'
);
--------------------------------------------------------------------------------
CREATE VIEW projects.v_project_operations
AS
SELECT
  p.id "Код",
  p.a_project_name "Проект",
  o.operation_en "Операция",
  pn.first_name ||' '|| pn.last_name "Пользователь",
  cr.a_operation_timestamp "Штамп времени"
FROM
  projects.e_project p,
  projects.e_project_operation o,
  persons.e_person pn,
  users.e_user u,
  projects.o_create_project cr,
  projects.o_start_project st
WHERE
  cr.e_project_id = p.id
AND
  cr.d_operation_type_id = o.id
AND
  cr.e_user_id = u.id
AND
  u.e_person_id = pn.id
AND
  st.e_project_id = p.id
AND
  st.d_operation_type_id = o.id
AND
  st.e_user_id = u.id
ORDER BY
  p.id
ASC;
