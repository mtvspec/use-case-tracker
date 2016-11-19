--============================================================================--
-- Project operations types (d_project_operation)
--============================================================================--
CREATE TABLE projects.d_project_operation (
  id SERIAL NOT NULL,
  project_operation_name_en VARCHAR (1000) NOT NULL,
  project_operation_desc_en VARCHAR (4000),
  project_operation_name_ru VARCHAR (1000) NOT NULL,
  project_operation_desc_ru VARCHAR (4000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        project_operation_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        project_operation_name_ru
      )
);
--------------------------------------------------------------------------------
INSERT INTO
  projects.d_project_operation_type (
    project_operation_name_en,
    project_operation_name_ru
  )
VALUES
(
  'Create project',
  'Создать проект'
),
(
  'Start project',
  'Запустить проект'
),
(
  'Suspend project',
  'Приостановить проект'
),
(
  'Renew project',
  'Возобновить проект'
),
(
  'Close project',
  'Закрыть проект'
),
(
  'Archieve project',
  'Заархивировать проект'
),
(
  'Reject project',
  'Отклонить проект'
),
(
  'Delete project',
  'Удалить проект'
);
--------------------------------------------------------------------------------
CREATE VIEW projects.v_project_operations
AS
SELECT
  o.id "Код",
  p.a_project_name "Проект",
  ot.project_operation_name_en "Операция",
  o.a_operation_timestamp "Штамп времени",
  pn.first_name ||' '|| pn.last_name "Пользователь"
FROM
  projects.f_project_operation o,
  projects.e_project p,
  projects.d_project_operation_type ot,
  persons.e_person pn,
  users.e_user u
WHERE
  o.d_project_operation_type_id = ot.id
AND
  o.e_project_id = p.id
AND
  o.e_user_id = u.id
AND
  u.e_person_id = pn.id
ORDER BY
  p.a_project_name,
  ot.id
ASC;
--------------------------------------------------------------------------------
