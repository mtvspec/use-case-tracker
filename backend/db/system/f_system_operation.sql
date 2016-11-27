--============================================================================--
-- System operation (f_system_operation)
--============================================================================--
CREATE TABLE systems.f_system_operation (
  id BIGSERIAL,
  d_system_operation_type_id INTEGER NOT NULL,
  a_operation_timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_session_id BIGINT NOT NULL,
  e_user_id BIGINT NOT NULL,
  e_system_id BIGINT NOT NULL,
  d_system_kind_id BIGINT NOT NULL,
  d_system_type_id BIGINT NOT NULL,
  a_system_name VARCHAR (1000) NOT NULL,
  a_system_desc TEXT NOT NULL,
  d_system_state_id INTEGER NOT NULL DEFAULT 1,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        d_system_operation_type_id
      ) REFERENCES systems.d_system_operation (id),
      FOREIGN KEY (
        e_session_id
      ) REFERENCES sessions.e_session (id),
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
-- Create system (create_system)
--============================================================================--
CREATE FUNCTION systems.create_system (
  IN v_d_system_kind_id INTEGER,
  IN v_d_system_type_id INTEGER,
  IN v_a_system_name VARCHAR (1000),
  IN v_a_system_desc TEXT,
  IN v_e_session_id BIGINT,
  IN v_e_user_id BIGINT,
  OUT e_system_id BIGINT
)
AS $$
WITH ins AS (
  INSERT INTO
    systems.e_system (
      d_system_kind_id,
      d_system_type_id,
      a_system_name,
      a_system_desc
    )
  VALUES (
    v_d_system_kind_id,
    v_d_system_type_id,
    v_a_system_name,
    v_a_system_desc
  )
  RETURNING
  *
)
INSERT INTO
  systems.f_system_operation (
    d_system_operation_type_id,
    e_session_id,
    e_user_id,
    e_system_id,
    d_system_kind_id,
    d_system_type_id,
    a_system_name,
    a_system_desc,
    d_system_state_id,
    is_deleted
  )
VALUES (
  1,
  v_e_session_id,
  v_e_user_id,
  (SELECT id FROM ins),
  (SELECT d_system_kind_id FROM ins),
  (SELECT d_system_type_id FROM ins),
  (SELECT a_system_name FROM ins),
  (SELECT a_system_desc FROM ins),
  (SELECT d_system_state_id FROM ins),
  (SELECT is_deleted FROM ins)
)
RETURNING
  e_system_id;
$$ LANGUAGE sql;
--============================================================================--
