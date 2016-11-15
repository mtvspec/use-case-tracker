CREATE TABLE statements.e_statement (
  id SERIAL,
  e_stakeholder_id INTEGER NOT NULL,
  a_create_date DATE NOT NULL DEFAULT CURRENT_DATE,
  a_name VARCHAR (1000) NOT NULL,
  a_description VARCHAR (4000),
  d_statement_type_id INTEGER NOT NULL,
  d_statement_state_id INTEGER NOT NULL DEFAULT 1,
    is_deleted CHAR (1) NOT NULL DEFAULT 'F',
      PRIMARY KEY (id),
      FOREIGN KEY (e_stakeholder_id) REFERENCES stakeholders.e_stakeholder (id),
      FOREIGN KEY (d_statement_type_id) REFERENCES statements.d_statement_type (id),
      FOREIGN KEY (d_statement_state_id) REFERENCES statements.d_statement_state (id),
      FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
);

CREATE TABLE statements.e_statement_log (
  id SERIAL,
  d_operation_type_id INTEGER NOT NULL,
  operation_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER NOT NULL,
  e_statement_id INTEGER NOT NULL,
  e_stakeholder_id INTEGER NOT NULL,
  a_create_date DATE NOT NULL DEFAULT CURRENT_DATE,
  a_name VARCHAR (1000) NOT NULL,
  a_description VARCHAR (4000),
  d_statement_type_id INTEGER NOT NULL,
  d_statement_state_id INTEGER NOT NULL,
    is_deleted CHAR (1) NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (d_operation_type_id) REFERENCES system.d_operation_type (id),
      FOREIGN KEY (user_id) REFERENCES users.e_user (id),
      FOREIGN KEY (e_statement_id) REFERENCES statements.e_statement (id),
      FOREIGN KEY (e_stakeholder_id) REFERENCES stakeholders.e_stakeholder (id),
      FOREIGN KEY (d_statement_type_id) REFERENCES statements.d_statement_type (id),
      FOREIGN KEY (d_statement_state_id) REFERENCES statements.d_statement_state (id),
      FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
 );

CREATE FUNCTION statements.create_statement (
  IN v_e_stakeholder_id INTEGER,
  IN v_a_create_date DATE,
  IN v_a_name VARCHAR (1000),
  IN v_a_description VARCHAR (4000),
  IN v_d_statement_type_id INTEGER,
  IN v_user INTEGER,
  OUT e_statement_id INTEGER
)
AS $$
WITH ins AS (
  INSERT INTO
    statements.e_statement (
      e_stakeholder_id,
      a_create_date,
      a_name,
      a_description,
      d_statement_type_id
    )
  VALUES (
    v_e_stakeholder_id,
    v_a_create_date,
    v_a_name,
    v_a_description,
    v_d_statement_type_id
  )
  RETURNING
    *
)
INSERT INTO
  statements.e_statement_log (
    d_operation_type_id,
    user_id,
    e_stakeholder_id,
    a_create_date,
    a_name,
    a_description,
    d_statement_type_id,
    d_statement_state_id
  )
VALUES (
  1,
  v_user,
  (SELECT id FROM ins),
  (SELECT a_create_date FROM ins),
  (SELECT a_name FROM ins),
  (SELECT a_description FROM ins),
  (SELECT d_statement_type_id FROM ins),
  (SELECT d_statement_state_id FROM ins)
)
RETURNING
  e_statement_id;
$$ LANGUAGE sql;

CREATE TABLE statements.update_statement (
  IN v_e_statement_id INTEGER,
  IN v_e_stakeholder_id INTEGER,
  IN v_a_create_date DATE,
  IN v_a_name VARCHAR (1000),
  IN v_a_description VARCHAR (4000),
  IN v_d_statement_type_id INTEGER,
  IN v_d_statement_state_id INTEGER,
  IN v_user INTEGER,
  OUT e_statement_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    statements.e_statement
  SET
    e_stakeholder_id = v_e_stakeholder_id,
    a_create_date = v_a_create_date,
    a_name = v_a_name,
    a_description = v_a_description,
    d_statement_type_id = v_d_statement_type_id,
    d_statement_state_id = v_d_statement_state_id
  WHERE
    id = v_e_statement_id
  RETURNING
    *
)
INSERT INTO
  statements.e_statement_log (
    d_operation_type_id,
    user_id,
    e_statement_id,
    e_stakeholder_id,
    a_create_date,
    a_name,
    a_description,
    d_statement_type_id,
    d_statement_state_id
  )
VALUES (
  2,
  v_user,
  (SELECT id FROM ins),
  (SELECT e_stakeholder_id FROM ins),
  (SELECT a_create_date FROM ins),
  (SELECT a_name FROM ins),
  (SELECT a_description FROM ins),
  (SELECT d_statement_type_id FROM ins),
  (SELECT d_statement_state_id FROM ins)
)
RETURNING
  e_statement_id;
$$ LANGUAGE sql;

CREATE FUNCTION statements.delete_statement (
  IN v_e_statement_id INTEGER,
  IN v_user INTEGER,
  OUT e_statement_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    statements.e_statement
  SET
    is_deleted = 'T'
  WHERE
    id = v_e_statement_id
  RETURNING
    *
)
INSERT INTO
  statements.e_statement_log (
    d_operation_type_id,
    user_id,
    e_statement_id,
    e_stakeholder_id,
    a_create_date,
    a_name,
    a_description,
    d_statement_type_id,
    d_statement_state_id
  )
VALUES (
  3,
  v_user,
  (SELECT id FROM ins),
  (SELECT e_stakeholder_id FROM ins),
  (SELECT a_create_date FROM ins),
  (SELECT a_name FROM ins),
  (SELECT a_description FROM ins),
  (SELECT d_statement_type_id FROM ins),
  (SELECT d_statement_state_id FROM ins)
)
RETURNING
  e_statement_id;
$$ LANGUAGE sql;

CREATE FUNCTION statements.restore_statement (
  IN v_e_statement_id INTEGER,
  IN v_user INTEGER,
  OUT e_statement_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    statements.e_statement
  SET
    is_deleted = 'F'
  WHERE
    id = v_e_statement_id
  RETURNING
    *
)
INSERT INTO
  statements.e_statement_log (
    d_operation_type_id,
    user_id,
    e_statement_id,
    e_stakeholder_id,
    a_create_date,
    a_name,
    a_description,
    d_statement_type_id,
    d_statement_state_id
  )
VALUES (
  4,
  v_user,
  (SELECT id FROM ins),
  (SELECT e_stakeholder_id FROM ins),
  (SELECT a_create_date FROM ins),
  (SELECT a_name FROM ins),
  (SELECT a_description FROM ins),
  (SELECT d_statement_type_id FROM ins),
  (SELECT d_statement_state_id FROM ins)
)
RETURNING
  e_statement_id;
$$ LANGUAGE sql;

CREATE TABLE statements.select_statement (
  IN v_e_statement_id INTEGER,
  IN v_user INTEGER
)
RETURNS statements.e_statement
AS $$
WITH sel AS (
  SELECT
    *
  FROM
    statements.e_statement
  WHERE
    id = v_e_statement_id
)
INSERT INTO
  statements.e_statement_log (
    d_operation_type_id,
    user_id,
    e_statement_id,
    e_stakeholder_id,
    a_create_date,
    a_name,
    a_description,
    d_statement_type_id,
    d_statement_state_id
  )
VALUES (
  5,
  v_user,
  (SELECT id FROM sel),
  (SELECT e_stakeholder_id FROM sel),
  (SELECT a_create_date FROM sel),
  (SELECT a_name FROM sel),
  (SELECT a_description FROM sel),
  (SELECT d_statement_type_id FROM sel),
  (SELECT d_statement_state_id FROM sel)
)
RETURNING
  (SELECT
    *
  FROM
    sel);
$$ LANGUAGE sql;
