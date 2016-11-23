--============================================================================--
-- Emp positional unit states (d_positional_unit_state)
--============================================================================--
CREATE TABLE organizations.d_positional_unit_state (
  id SERIAL NOT NULL,
  d_positional_state_name_en VARCHAR (1000) NOT NULL,
  d_positional_state_desc_en TEXT,
  d_positional_state_name_ru VARCHAR (1000),
  d_positional_state_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        d_positional_state_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        d_positional_state_name_ru
      )
);
--============================================================================--
