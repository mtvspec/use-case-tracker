--============================================================================--
-- Project kinds (d_project_kind)
--============================================================================--
CREATE TABLE projects.d_project_kind (
  id SERIAL NOT NULL,
  a_project_kind_name_en VARCHAR (1000) NOT NULL,
  a_project_kind_desc_en TEXT,
  a_project_kind_name_ru VARCHAR (1000) NOT NULL,
  a_project_kind_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_project_kind_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_project_kind_name_ru
      )
);
--============================================================================--
-- Project kinds (values)
--============================================================================--
INSERT INTO
  projects.d_project_kind (
    a_project_kind_name_en,
    a_project_kind_name_ru
  )
VALUES
(
  'Information system',
  'Разработка и поставка информационной системы под заказ'
);
--============================================================================--
