--============================================================================--
-- System kind (d_system_kind)
--============================================================================--
CREATE TABLE systems.d_system_kind (
  id SERIAL NOT NULL,
  a_system_kind_name_en VARCHAR (1000) NOT NULL,
  a_system_kind_desc_en TEXT,
  a_system_kind_name_ru VARCHAR (1000),
  a_system_kind_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_system_kind_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_system_kind_name_ru
      )
);
--============================================================================--
INSERT INTO
  systems.d_system_kind (
    a_system_kind_name_en
  )
VALUES
(
  'Information system'
);
--============================================================================--
