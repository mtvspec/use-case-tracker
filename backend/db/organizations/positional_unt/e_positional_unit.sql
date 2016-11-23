--============================================================================--
-- Positional unit (e_positional_unit)
--============================================================================--
CREATE TABLE organizations.e_positional_unit (
  id SERIAL,
  d_positional_unit_id INTEGER NOT NULL,
  a_positional_unit_name VARCHAR (1000) NOT NULL,
  a_positional_unit_desc TEXT,
  d_positional_unit_state_id INTEGER NOT NULL,
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      d_positional_unit_id
    ) REFERENCES organizations.d_positional_unit (id),
    FOREIGN KEY (
      d_positional_unit_state_id
    ) REFERENCES organizations.d_positional_unit_state (id)
);
--============================================================================--
