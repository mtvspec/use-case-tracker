--============================================================================--
-- System (e_system)
--============================================================================--
CREATE TABLE systems.e_system (
  id BIGSERIAL NOT NULL,
  d_system_kind_id INTEGER NOT NULL,
  d_system_type_id INTEGER NOT NULL,
  a_system_name VARCHAR (1000) NOT NULL,
  a_system_desc TEXT NOT NULL,
  d_system_state_id INTEGER NOT NULL DEFAULT 1,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        d_system_kind_id,
        d_system_type_id,
        a_system_name
      ),
      UNIQUE (
        id
      ),
      FOREIGN KEY (
        d_system_kind_id
      ) REFERENCES systems.d_system_kind (id),
      FOREIGN KEY (
        d_system_type_id
      ) REFERENCES systems.d_system_type (id),
      FOREIGN KEY (
        d_system_state_id
      ) REFERENCES systems.d_system_state (id)
);
--============================================================================--
-- Project (r_e_project_e_system)
--============================================================================--
CREATE TABLE systems.r_e_project_e_system (
  id BIGSERIAL NOT NULL,
  e_project_id BIGINT NOT NULL,
  e_system_id BIGINT NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_project_id
      ) REFERENCES projects.e_project (id),
      FOREIGN KEY (
        e_system_id
      ) REFERENCES systems.e_system (id)
);
--============================================================================--
-- Component (r_e_system_e_component)
--============================================================================--
CREATE TABLE systems.r_e_system_e_component (
  id BIGSERIAL NOT NULL,
  e_system_id BIGINT NOT NULL,
  e_component_id BIGINT NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_system_id
      ) REFERENCES systems.e_system (id),
      FOREIGN KEY (
        e_component_id
      ) REFERENCES components.e_component (id)
);
--============================================================================--
