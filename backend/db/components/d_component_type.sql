--============================================================================--
-- Component type (d_component_type)
--============================================================================--
CREATE TABLE components.d_component_type (
  id SERIAL,
  a_component_type_name_en VARCHAR (1000) NOT NULL,
  a_component_type_desc_en TEXT,
  a_component_type_name_ru VARCHAR (1000) NOT NULL,
  a_component_type_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_component_type_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_component_type_name_ru
      )
);
--============================================================================--
INSERT INTO
  components.d_component_type (
    a_component_type_name_en,
    a_component_type_name_ru
  )
VALUES
(
  'Information system',
  'Информационная система'
),
(
  'Subsystem',
  'Подсистема'
);
--============================================================================--
