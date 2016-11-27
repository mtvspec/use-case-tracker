--============================================================================--
-- Statement operation (f_statement_operation)
--============================================================================--
CREATE TABLE statements.f_statement_operation (
  id BIGSERIAL,
  d_statement_operation_type_id INTEGER NOT NULL,
  a_operation_ts TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_user_id INTEGER NOT NULL,
  e_statement_id INTEGER NOT NULL,
  e_stakeholder_id INTEGER NOT NULL,
  d_statement_type_id INTEGER NOT NULL,
  a_statement_name VARCHAR (1000) NOT NULL,
  a_statement_desc TEXT,
  d_statement_state_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        d_statement_operation_type_id
      ) REFERENCES statements.d_statement_operation (id),
      FOREIGN KEY (
        e_user_id
      ) REFERENCES users.e_user (id),
      FOREIGN KEY (
        e_statement_id
      ) REFERENCES statements.e_statement (id),
      FOREIGN KEY (
        e_stakeholder_id
      ) REFERENCES stakeholders.e_stakeholder (id),
      FOREIGN KEY (
        d_statement_type_id
      ) REFERENCES statements.d_statement_type (id),
      FOREIGN KEY (
        d_statement_state_id
      ) REFERENCES statements.d_statement_state (id)
 );
--============================================================================--
-- Create statement (create_statement)
--============================================================================--
CREATE FUNCTION statements.create_statement (
  IN v_e_stakeholder_id BIGINT,
  IN v_a_statement_name VARCHAR (1000),
  IN v_a_statement_desc TEXT DEFAULT NULL,
  IN v_d_statement_type_id INTEGER DEFAULT NULL,
  IN v_e_user_id BIGINT,
  OUT e_statement_id BIGINT
)
AS $$
WITH ins AS (
  INSERT INTO
    statements.e_statement (
      e_stakeholder_id,
      a_statement_name,
      a_statement_desc,
      d_statement_type_id
    )
  VALUES (
    v_e_stakeholder_id,
    v_a_statement_name,
    v_a_statement_desc,
    v_d_statement_type_id
  )
  RETURNING
    *
)
INSERT INTO
  statements.f_statement_operation (
    d_statement_operation_type_id,
    e_user_id,
    e_stakeholder_id,
    a_statement_name,
    a_statement_desc,
    d_statement_type_id,
    d_statement_state_id
  )
VALUES (
  1,
  v_e_user_id,
  (SELECT id FROM ins),
  (SELECT e_stakeholder_id FROM ins)
  (SELECT a_statement_name FROM ins),
  (SELECT a_statement_desc FROM ins),
  (SELECT d_statement_type_id FROM ins),
  (SELECT d_statement_state_id FROM ins)
)
RETURNING
  e_statement_id;
$$ LANGUAGE sql;
--============================================================================--
-- Update statement (update_statement)
--============================================================================--
CREATE TABLE statements.update_statement (
  IN v_e_statement_id BIGINT,
  IN v_e_stakeholder_id BIGINT,
  IN v_a_statement_name VARCHAR (1000),
  IN v_a_statement_desc TEXT DEFAULT NULL,
  IN v_d_statement_type_id INTEGER,
  IN v_d_statement_state_id INTEGER,
  IN v_e_user_id BIGINT,
  OUT e_statement_id BIGINT
)
AS $$
WITH upd AS (
  UPDATE
    statements.e_statement
  SET
    e_stakeholder_id = v_e_stakeholder_id,
    a_statement_name = v_a_statement_name,
    a_statement_desc = v_a_statement_desc,
    d_statement_type_id = v_d_statement_type_id,
    d_statement_state_id = v_d_statement_state_id
  WHERE
    id = v_e_statement_id
  RETURNING
    *
)
INSERT INTO
  statements.f_statement_operation (
    d_statement_operation_type_id,
    e_user_id,
    e_statement_id,
    e_stakeholder_id,
    a_statement_name,
    a_statement_desc,
    d_statement_type_id,
    d_statement_state_id
  )
VALUES (
  2,
  v_e_user_id,
  (SELECT id FROM ins),
  (SELECT e_stakeholder_id FROM ins),
  (SELECT a_statement_name FROM ins),
  (SELECT a_statement_desc FROM ins),
  (SELECT d_statement_type_id FROM ins),
  (SELECT d_statement_state_id FROM ins)
)
RETURNING
  e_statement_id;
$$ LANGUAGE sql;
--============================================================================--
-- Delete statement (delete_statement)
--============================================================================--
CREATE FUNCTION statements.delete_statement (
  IN v_e_statement_id BIGINT,
  IN v_user BIGINT,
  OUT e_statement_id BIGINT
)
AS $$
WITH upd AS (
  UPDATE
    statements.e_statement
  SET
    is_deleted = TRUE
  WHERE
    id = v_e_statement_id
  RETURNING
    *
)
INSERT INTO
  statements.f_statement_operation (
    d_statement_operation_type_id,
    e_user_id,
    e_statement_id,
    e_stakeholder_id,
    a_statement_name,
    a_statement_desc,
    d_statement_type_id,
    d_statement_state_id
  )
VALUES (
  3,
  v_e_user_id,
  (SELECT id FROM ins),
  (SELECT e_stakeholder_id FROM ins),
  (SELECT a_statement_name FROM ins),
  (SELECT a_statement_desc FROM ins),
  (SELECT d_statement_type_id FROM ins),
  (SELECT d_statement_state_id FROM ins)
)
RETURNING
  e_statement_id;
$$ LANGUAGE sql;
--============================================================================--
-- Restore statement (restore_statement)
--============================================================================--
CREATE FUNCTION statements.restore_statement (
  IN v_e_statement_id BIGINT,
  IN v_e_user_id BIGINT,
  OUT e_statement_id BIGINT
)
AS $$
WITH upd AS (
  UPDATE
    statements.e_statement
  SET
    is_deleted = FALSE
  WHERE
    id = v_e_statement_id
  RETURNING
    *
)
INSERT INTO
  statements.f_statement_operation (
    d_statement_operation_type_id,
    e_user_id,
    e_statement_id,
    e_stakeholder_id,
    a_statement_name,
    a_statement_desc,
    d_statement_type_id,
    d_statement_state_id
  )
VALUES (
  4,
  v_e_user_id,
  (SELECT id FROM ins),
  (SELECT e_stakeholder_id FROM ins),
  (SELECT a_statement_name FROM ins),
  (SELECT a_statement_desc FROM ins),
  (SELECT d_statement_type_id FROM ins),
  (SELECT d_statement_state_id FROM ins)
)
RETURNING
  e_statement_id;
$$ LANGUAGE sql;
--============================================================================--
