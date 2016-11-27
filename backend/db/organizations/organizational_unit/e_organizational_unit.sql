--============================================================================--
-- Organizational unit (e_organizational_unit)
--============================================================================--
CREATE TABLE organizations.e_organizational_unit (
  id BIGSERIAL,
  e_organizational_unit_id BIGINT,
  d_organizational_unit_kind_id INTEGER NOT NULL,
  d_organizational_unit_type_id INTEGER NOT NULL,
  a_organizational_unit_name VARCHAR (1000) NOT NULL,
  a_organizational_unit_desc TEXT,
  d_organizational_unit_state_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_organizational_unit_id
      ) REFERENCES organizations.e_organizational_unit (id),
      FOREIGN KEY (
        d_organizational_unit_kind_id
      ) REFERENCES organizations.d_organizational_unit_kind (id),
      FOREIGN KEY (
        d_organizational_unit_type_id
      ) REFERENCES organizations.d_organizational_unit_type (id),
      FOREIGN KEY (
        d_organizational_unit_state_id
      ) REFERENCES organizations.d_organizational_unit_state (id)
);
--============================================================================--
