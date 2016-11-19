--============================================================================--
-- System (e_system)
--============================================================================--
CREATE TABLE systems.e_system (
  id SERIAL NOT NULL,
  d_system_type_id INTEGER NOT NULL,
  a_name VARCHAR (1000) NOT NULL,
  a_desc VARCHAR (4000),
  d_system_state_id INTEGER NOT NULL DEFAULT 1,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_name
      ),
      UNIQUE (
        id
      )
);
--------------------------------------------------------------------------------
-- Project (r_e_project_e_system)
--------------------------------------------------------------------------------
CREATE TABLE system.r_e_project_e_system (
  id SERIAL NOT NULL,
  e_project_id INTEGER NOT NULL,
  e_system_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        e_project_id,
        e_system_id
      ),
      UNIQUE (
        id
      )
);
--------------------------------------------------------------------------------
-- Component (r_e_system_e_component)
--------------------------------------------------------------------------------
CREATE TABLE system.r_e_system_e_component (
  id SERIAL NOT NULL,
  e_system_id INTEGER NOT NULL,
  e_component_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        e_system_id,
        e_component_id
      ),
      UNIQUE (
        id
      )
);
--------------------------------------------------------------------------------
