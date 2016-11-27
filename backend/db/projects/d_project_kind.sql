--============================================================================--
-- Project kinds (d_project_kind)
--============================================================================--
CREATE TABLE projects.d_project_kind (
  id SERIAL NOT NULL,
  project_kind_name_en VARCHAR (1000) NOT NULL,
  project_kind_desc_en TEXT,
  project_kind_name_ru VARCHAR (1000) NOT NULL,
  project_kind_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        project_kind_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        project_kind_name_ru
      )
);
--============================================================================--
-- Project kinds (values)
--============================================================================--
INSERT INTO
  projects.d_project_kind (
    project_kind_name_en,
    project_kind_name_ru
  )
VALUES
(
  'Information system',
  'Разработка и поставка информационной системы под заказ'
);
--============================================================================--
