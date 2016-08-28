CREATE TABLE stakeholders.e_stakeholder (
  id SERIAL,
  e_person_id INTEGER NOT NULL,
  a_description VARCHAR (4000),
    is_deleted CHAR (1) NOT NULL DEFAULT 'F',
      PRIMARY KEY (id),
      FOREIGN KEY (e_person_id) REFERENCES persons.e_person (id),
      FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
);

CREATE TABLE stakeholders.e_stakeholder_log (
  id SERIAL,
  d_operation_type_id INTEGER NOT NULL,
  operation_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
  user_id INTEGER NOT NULL,
  e_person_id INTEGER NOT NULL,
  a_description VARCHAR (4000),
    is_deleted CHAR (1) NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (d_operation_type_id) REFERENCES system.d_operation_type (id),
      FOREIGN KEY (user_id) REFERENCES users.e_user (id),
      FOREIGN KEY (e_person_id) REFERENCES persons.e_person (id),
      FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
);

CREATE FUNCTION stakeholders.create_stakeholder (
  IN v_e_person_id INTEGER,
  IN v_a_description VARCHAR (4000),
  IN v_user_id INTEGER,
  OUT e_stakeholder_id INTEGER
)
AS $$
WITH ins AS (
  INSERT INTO
    stakeholders.e_stakeholder (
      e_person_id,
      a_description
    )
  VALUES (
    v_e_person_id,
    v_a_description
  )
  RETURNING
    *
)
INSERT INTO
  stakeholders.e_stakeholder_log (
    d_operation_type_id,
    user_id,
    e_stakeholder_id,
    e_person_id,
    a_description,
    is_deleted
  )
VALUES (
  1,
  v_user_id,
  (SELECT id FROM ins),
  (SELECT e_person_id FROM ins),
  (SELECT a_description FROM ins),
  (SELECT is_deleted FROM ins)
)
RETURNING
  e_stakeholder_id;
$$ LANGUAGE sql;

CREATE FUNCTION stakeholders.update_stakeholders (
  IN v_e_stakeholder_id INTEGER,
  IN v_e_person_id INTEGER,
  IN v_a_description VARCHAR (4000),
  IN v_user_id INTEGER,
  OUT e_stakeholder_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    stakeholders.e_stakeholder_log
  SET
    e_person_id = v_e_person_id,
    a_description = v_a_description
  WHERE
    id = v_e_stakeholder_id
  RETURNING
    *
)
INSERT INTO
  stakeholders.e_stakeholder_log (
    d_operation_type_id,
    user_id,
    e_stakeholder_id,
    e_person_id,
    a_description,
    is_deleted
  )
VALUES (
  2,
  v_user_id,
  (SELECT id FROM upd),
  (SELECT e_person_id FROM upd),
  (SELECT a_description FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_stakeholder_id;
$$ LANGUAGE sql;

CREATE FUNCTION stakeholders.delete_stakeholder (
  IN v_e_stakeholder_id INTEGER,
  IN v_user INTEGER,
  OUT e_stakeholder_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    stakeholders.e_stakeholder
  SET
    is_deleted = 'T'
  WHERE
    id = v_e_stakeholder_id
  RETURNING
    *
)
INSERT INTO
  stakeholders.e_stakeholder_log (
    d_operation_type_id,
    user_id,
    e_stakeholder_id,
    e_person_id,
    a_description,
    is_deleted
  )
VALUES (
  3,
  v_user,
  (SELECT id FROM upd),
  (SELECT e_person_id FROM upd),
  (SELECT a_description FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_stakeholder_id;
$$ LANGUAGE sql;

CREATE FUNCTION stakeholders.restore_stakeholder (
  IN v_e_stakeholder_id INTEGER,
  IN v_user INTEGER,
  OUT e_stakeholder_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    stakeholders.e_stakeholder
  SET
    is_deleted = 'F'
  WHERE
    id = v_e_stakeholder_id
  RETURNING
    *
)
INSERT INTO
  stakeholders.e_stakeholder_log (
    d_operation_type_id,
    user_id,
    e_stakeholder_id,
    e_person_id,
    a_description,
    is_deleted
  )
VALUES (
  4,
  v_user,
  (SELECT id FROM upd),
  (SELECT e_person_id FROM upd),
  (SELECT a_description FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_stakeholder_id;
$$ LANGUAGE sql;
