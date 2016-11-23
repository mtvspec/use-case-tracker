--============================================================================--
-- Organizational unit type (d_organizational_unit_type)
--============================================================================--
CREATE TABLE organizations.d_organizational_unit_type (
  id SERIAL NOT NULL,
  a_organizational_unit_type_name_en VARCHAR (1000) NOT NULL,
  a_organizational_unit_type_desc_en TEXT,
  a_organizational_unit_type_name_ru VARCHAR (1000),
  a_organizational_unit_type_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_organizational_unit_type_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_organizational_unit_type_name_ru
      )
);
--============================================================================--
