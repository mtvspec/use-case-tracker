--============================================================================--
-- Actor operation (f_actor_operation)
--============================================================================--
CREATE TABLE use_cases.f_actor_operation (
  id BIGSERIAL,
  d_actor_operation_type_id INTEGER NOT NULL,
  a_operation_ts TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_session_id BIGINT NOT NULL,
  e_user_id BIGINT NOT NULL,
  e_actor_id BIGINT NOT NULL,
  d_actor_type_id INTEGER NOT NULL,
  a_actor_short_name VARCHAR (100) NOT NULL,
  a_actor_long_name VARCHAR (1000) NOT NULL,
  a_actor_desc TEXT NOT NULL,
  d_actor_state_id INTEGER NOT NULL,
  is_deleted BOOLEAN NOT NULL,
    PRIMARY KEY (
      id
    ),
    UNIQUE (
      e_actor_id
    ),
    FOREIGN KEY (
      d_actor_operation_type_id
    ) REFERENCES use_cases.d_actor_operation (id),
    FOREIGN KEY (
      e_session_id
    ) REFERENCES sessions.e_session (id),
    FOREIGN KEY (
      e_user_id
    ) REFERENCES users.e_user (id),
    FOREIGN KEY (
      e_actor_id
    ) REFERENCES use_cases.e_actor (id),
    FOREIGN KEY (
      d_actor_type_id
    ) REFERENCES use_cases.d_actor_type (id),
    FOREIGN KEY (
      d_actor_state_id
    ) REFERENCES use_cases.d_actor_state (id)
);
--============================================================================--
-- Create actor (create_actor)
--============================================================================--
CREATE FUNCTION use_cases.create_actor (
  IN v_d_actor_type_id INTEGER DEFAULT NULL,
  IN v_a_short_name VARCHAR (100) DEFAULT NULL,
  IN v_a_long_name VARCHAR (1000) DEFAULT NULL,
  IN v_a_description VARCHAR (4000) DEFAULT NULL,
  IN v_e_user_id INTEGER DEFAULT NULL,
  OUT e_actor_id INTEGER
)
AS $$
WITH ins AS (
  INSERT INTO
    use_cases.e_actor (
      d_actor_type_id,
      a_short_name,
      a_long_name,
      a_description
    )
  VALUES
  (
    v_d_actor_type_id,
    v_a_short_name,
    v_a_long_name,
    v_a_description
  )
  RETURNING
    *
)
INSERT INTO
  use_cases.f_actor_operation (
    d_operation_type_id,
    e_user_id,
    e_actor_id,
    d_actor_type_id,
    a_short_name,
    a_long_name,
    a_description
  )
VALUES
(
  1,
  v_e_user_id,
  (SELECT id FROM ins),
  (SELECT d_actor_type_id FROM ins),
  (SELECT a_short_name FROM ins),
  (SELECT a_long_name FROM ins),
  (SELECT a_description FROM ins)
)
RETURNING
  (SELECT id FROM ins) "e_actor_id";
$$ LANGUAGE sql;
--============================================================================--
-- Update actor
--============================================================================--
CREATE FUNCTION use_cases.update_actor (
  IN v_e_actor_id INTEGER DEFAULT NULL,
  IN v_d_actor_type_id INTEGER DEFAULT NULL,
  IN v_a_short_name VARCHAR (100) DEFAULT NULL,
  IN v_a_long_name VARCHAR (1000) DEFAULT NULL,
  IN v_a_description VARCHAR (4000) DEFAULT NULL,
  IN v_e_user_id INTEGER DEFAULT NULL,
  OUT e_actor_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    use_cases.e_actor
  SET
    d_actor_type_id = v_d_actor_type_id,
    a_short_name = v_a_short_name,
    a_long_name = v_a_long_name,
    a_description = v_a_description
  WHERE
    id = v_e_actor_id
  RETURNING
    *
)
INSERT INTO
  use_cases.f_actor_operation (
    d_operation_type_id,
    e_user_id,
    e_actor_id,
    d_actor_type_id,
    a_short_name,
    a_long_name,
    a_description
  )
VALUES
(
  2,
  v_e_user_id,
  (SELECT id FROM upd),
  (SELECT d_actor_type_id FROM upd),
  (SELECT a_short_name FROM upd),
  (SELECT a_long_name FROM upd),
  (SELECT a_description FROM upd)
)
RETURNING
  (SELECT id FROM upd) "e_actor_id";
$$ LANGUAGE sql;