--============================================================================--
-- Positional unit type (d_positional_unit_type)
--============================================================================--
CREATE TABLE organizations.d_positional_unit_type (
  id SERIAL NOT NULL,
  a_positional_unit_type_name_en VARCHAR (1000) NOT NULL,
  a_positional_unit_type_desc_en TEXT,
  a_positional_unit_type_name_ru VARCHAR (1000),
  a_positional_unit_type_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_positional_unit_type_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_positional_unit_type_name_ru
      )
);
--============================================================================--
