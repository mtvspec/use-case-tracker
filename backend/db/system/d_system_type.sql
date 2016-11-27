--============================================================================--
-- System Type (d_system_type)
--============================================================================--
CREATE TABLE systems.d_system_type (
  id SERIAL NOT NULL,
  a_system_type_name_en VARCHAR (1000) NOT NULL,
  a_system_type_desc_en TEXT,
  a_system_type_name_ru VARCHAR (1000),
  a_system_type_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_system_type_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_system_type_name_ru
      )
);
--============================================================================--
INSERT INTO
  systems.d_system_type (
    a_system_type_name_en
  )
VALUES
(
  'Information system'
);
--============================================================================--
