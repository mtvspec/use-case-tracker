--============================================================================--
-- Component (e_component)
--============================================================================--
CREATE TABLE components.e_component (
  id SERIAL,
  e_component_id INTEGER,
  d_component_type_id INTEGER,
  a_component_name VARCHAR (1000) NOT NULL,
  a_component_desc TEXT,
  d_component_state_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_component_id
      ) REFERENCES components.e_component (id),
      FOREIGN KEY (
        d_component_type_id
      ) REFERENCES components.d_component_type (id),
      FOREIGN KEY (
        d_component_state_id
      ) REFERENCES components.d_component_state (id)
);
--------------------------------------------------------------------------------
