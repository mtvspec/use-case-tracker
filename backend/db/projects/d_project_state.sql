--============================================================================--
-- Project State (d_project_state)
--============================================================================--
CREATE TABLE projects.d_project_state (
  id SERIAL NOT NULL,
  a_project_state_name_en VARCHAR (1000) NOT NULL,
  a_project_state_desc_en TEXT,
  a_project_state_name_ru VARCHAR (1000) NOT NULL,
  a_project_state_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_project_state_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_project_state_name_ru
      )
);
--============================================================================--
INSERT INTO
  projects.d_project_state (
    a_project_state_name_en,
    a_project_state_name_ru
  )
VALUES
(
  'Created',
  'Создан'
),
(
  'Active',
  'В производстве'
),
(
  'Suspended',
  'Приостановлен'
),
(
  'Renewed',
  'Возобновлен'
),
(
  'Closed',
  'Закрыт'
),
(
  'Archieved',
  'В архиве'
),
(
  'Rejected',
  'Отклонен'
),
(
  'Deleted',
  'Удален'
);
--============================================================================--
