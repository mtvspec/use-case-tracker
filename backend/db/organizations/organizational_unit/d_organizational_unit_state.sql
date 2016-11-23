--============================================================================--
-- Organizational unit state (d_organizational_unit_state)
--============================================================================--
CREATE TABLE organizations.d_organizational_unit_state (
  id SERIAL NOT NULL,
  a_organizational_unit_state_name_en VARCHAR (1000) NOT NULL,
  a_organizational_unit_state_desc_en TEXT,
  a_organizational_unit_state_name_ru VARCHAR (1000),
  a_organizational_unit_state_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_organizational_unit_state_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_organizational_unit_state_name_ru
      )
);
--============================================================================--
