--============================================================================--
-- Positional unit kind (d_positional_unit_kind)
--============================================================================--
CREATE TABLE organizations.d_positional_unit_kind (
  id SERIAL NOT NULL,
  a_positional_unit_kind_name_en VARCHAR (1000) NOT NULL,
  a_positional_unit_kind_desc_en TEXT,
  a_positional_unit_kind_name_ru VARCHAR (1000),
  a_positional_unit_kind_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_positional_unit_kind_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_positional_unit_kind_name_ru
      )
);
--============================================================================--
