--============================================================================--
-- Positional unit (e_positional_unit)
--============================================================================--
CREATE TABLE organizations.e_positional_unit (
  id BIGSERIAL,
  e_organizational_unit_id BIGINT NOT NULL,
  e_positional_unit_id BIGINT,
  a_positional_unit_name VARCHAR (1000) NOT NULL,
  a_positional_unit_desc TEXT,
  d_positional_unit_state_id INTEGER NOT NULL,
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      e_organizational_unit_id
    ) REFERENCES organizations.e_organizational_unit (id),
    FOREIGN KEY (
      e_positional_unit_id
    ) REFERENCES organizations.e_positional_unit (id),
    FOREIGN KEY (
      d_positional_unit_state_id
    ) REFERENCES dict.e_dict_value (id)
);
--============================================================================--
