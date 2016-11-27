--============================================================================--
-- Component operation (f_component_operation)
--============================================================================--
CREATE TABLE components.f_component_operation (
  id BIGINT,
  d_component_operation_type_id INTEGER NOT NULL,
  a_operation_ts TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_session_id BIGINT NOT NULL,
  e_user_id BIGINT NOT NULL,
  e_component_id BIGINT NOT NULL,
  d_component_type_id INTEGER NOT NULL,
  a_component_name VARCHAR (1000) NOT NULL,
  a_component_desc TEXT,
  d_component_state_id INTEGER NOT NULL,
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      d_component_operation_type_id
    ) REFERENCES components.d_component_operation (id),
    FOREIGN KEY (
      e_session_id
    ) REFERENCES sessions.e_session (id),
    FOREIGN KEY (
      e_user_id
    ) REFERENCES users.e_user (id),
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
--============================================================================--
