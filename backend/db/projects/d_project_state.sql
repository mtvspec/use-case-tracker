--============================================================================--
-- Project State (d_project_state)
--============================================================================--
CREATE TABLE projects.d_project_state (
  id SERIAL NOT NULL,
  project_state_name_en VARCHAR (1000) NOT NULL,
  project_state_desc_en VARCHAR (4000),
  project_state_name_ru VARCHAR (1000) NOT NULL,
  project_state_desc_ru VARCHAR (4000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        project_state_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        project_state_name_ru
      )
);
--------------------------------------------------------------------------------
INSERT INTO
  projects.d_project_state (
    project_state_name_en,
    project_state_name_ru
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
