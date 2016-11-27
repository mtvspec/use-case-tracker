--============================================================================--
-- Positional unit (d_positional_unit)
--============================================================================--
CREATE TABLE organizations.d_positional_unit (
  id SERIAL,
  e_organizational_unit_id BIGINT NOT NULL,
  d_positional_unit_kind_id INTEGER NOT NULL,
  d_positional_unit_type_id INTEGER NOT NULL,
  a_positional_unit_type_name_en VARCHAR (1000) NOT NULL,
  a_positional_unit_type_desc_en TEXT,
  a_positional_unit_type_name_ru VARCHAR (1000),
  a_positional_unit_type_desc_ru TEXT,
  is_manager BOOLEAN NOT NULL DEFAULT FALSE,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_positional_unit_type_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_positional_unit_type_name_ru
      ),
      FOREIGN KEY (
        e_organizational_unit_id
      ) REFERENCES organizations.e_organizational_unit (id),
      FOREIGN KEY (
        d_positional_unit_kind_id
      ) REFERENCES organizations.d_positional_unit_kind (id),
      FOREIGN KEY (
        d_positional_unit_type_id
      ) REFERENCES organizations.d_positional_unit_type (id)
);
--============================================================================--
