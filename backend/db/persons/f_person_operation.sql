--============================================================================--
-- Person operation (f_person_operation) - current
--============================================================================--
CREATE TABLE persons.f_person_operation (
  id BIGSERIAL,
  d_person_operation_type_id INTEGER NOT NULL,
  e_session_id BIGINT NOT NULL,
  e_user_id BIGINT NOT NULL,
  e_person_id BIGINT NOT NULL,
  a_person_iin CHAR (12),
  a_person_last_name VARCHAR (100),
  a_person_first_name VARCHAR (100),
  a_person_middle_name VARCHAR (100),
  a_person_dob DATE,
  d_person_gender_id CHAR (1),
  is_deleted BOOLEAN,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      d_person_operation_type_id
    ) REFERENCES persons.d_person_operation (id),
    FOREIGN KEY (
      e_session_id
    ) REFERENCES sessions.e_session (id),
    FOREIGN KEY (
      e_user_id
    ) REFERENCES users.e_user (id),
    FOREIGN KEY (
      e_person_id
    ) REFERENCES persons.e_person (id),
    FOREIGN KEY (
      d_person_gender_id
    ) REFERENCES persons.d_person_gender (id)
);
--============================================================================--
-- Create person (create_person) - current
--============================================================================--
CREATE FUNCTION persons.create_person (
  IN v_a_person_iin CHAR (12) DEFAULT NULL,
  IN v_a_person_last_name VARCHAR (100) DEFAULT NULL,
  IN v_a_person_first_name VARCHAR (100) DEFAULT NULL,
  IN v_a_person_middle_name VARCHAR (100) DEFAULT NULL,
  IN v_a_person_dob DATE DEFAULT NULL,
  IN v_d_person_gender_id CHAR (1) DEFAULT NULL,
  IN v_e_session_id BIGINT DEFAULT 0,
  IN v_e_user_id BIGINT DEFAULT 0,
  OUT e_person_id BIGINT
)
AS $$
WITH ins AS (
  INSERT INTO
    persons.e_person (
      a_person_iin,
      a_person_last_name,
      a_person_first_name,
      a_person_middle_name,
      a_person_dob,
      d_person_gender_id
    )
  VALUES (
    v_a_person_iin,
    v_a_person_last_name,
    v_a_person_first_name,
    v_a_person_middle_name,
    v_a_person_dob,
    v_d_person_gender_id
  )
  RETURNING
    *
)
INSERT INTO
  persons.f_person_operation (
    d_person_operation_type_id,
    e_session_id,
    e_user_id,
    e_person_id,
    a_person_iin,
    a_person_last_name,
    a_person_first_name,
    a_person_middle_name,
    a_person_dob,
    d_person_gender_id,
    is_deleted
  )
VALUES (
  1,
  v_e_session_id,
  v_e_user_id,
  (SELECT id FROM ins),
  (SELECT a_person_iin FROM ins),
  (SELECT a_person_last_name FROM ins),
  (SELECT a_person_first_name FROM ins),
  (SELECT a_person_middle_name FROM ins),
  (SELECT a_person_dob FROM ins),
  (SELECT d_person_gender_id FROM ins),
  (SELECT is_deleted FROM ins)
)
RETURNING
  e_person_id;
$$ LANGUAGE SQL;
--============================================================================--
-- Person operation (f_person_operation) - future
--============================================================================--
CREATE TABLE persons.f_person_operation (
  id BIGSERIAL,
  d_person_operation_type_id INTEGER NOT NULL,
  a_operation_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_user_id BIGINT NOT NULL,
  e_person_edb_id BIGINT,
  e_person_idb_id BIGINT,
  is_deleted BOOLEAN NOT NULL,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        d_operation_type_id
      ) REFERENCES persons.d_person_operation (id),
      FOREIGN KEY (
        e_user_id
      ) REFERENCES users.e_user (id),
      FOREIGN KEY (
        e_person_edb_id
      ) REFERENCES persons.d_persons_edb (id),
      FOREIGN KEY (
        e_person_idb_id
      ) REFERENCES persons.d_persons_idb (id)
);
--============================================================================--
-- Create person (create_person)
--============================================================================--
CREATE FUNCTION persons.create_person (
  IN v_d_person_edb_id BIGINT DEFAULT NULL,
  IN v_d_person_idb_id BIGINT DEFAULT NULL,
  IN v_e_user_id BIGINT DEFAULT NULL,
  OUT e_person_id BIGINT
)
AS $$
WITH ins AS (
  INSERT INTO
    persons.e_person (
      e_person_edb_id,
      e_person_idb_id
    )
  VALUES (
    v_d_person_edb_id,
    v_d_person_idb_id
  )
  RETURNING
    *
)
INSERT INTO
  persons.f_person_operation (
    d_operation_type_id,
    e_user_id,
    e_person_edb_id,
    e_person_idb_id
  )
VALUES (
  1,
  v_e_user_id,
  (SELECT e_person_edb_id FROM ins),
  (SELECT e_person_idb_id FROM ins)
)
RETURNING
  e_person_id;
$$ LANGUAGE sql;
--============================================================================--
SELECT
  create_person (
    '871215301496',
    'Маусумбаев',
    'Тимур',
    'Владимирович',
    '1987-12-15',
    'M',
    1 -- user_id
  );
--============================================================================--
-- Update person (update_person)
--============================================================================--
CREATE FUNCTION persons.update_person (
  IN v_e_person_id INTEGER,
  IN v_iin CHAR (12),
  IN v_last_name VARCHAR (400),
  IN v_first_name VARCHAR (300),
  IN v_middle_name VARCHAR (500),
  IN v_dob DATE,
  IN v_gender_id CHAR (1),
  IN v_user_id INTEGER,
  OUT e_person_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    persons.e_person
  SET
    iin = v_iin,
    last_name = v_last_name,
    first_name = v_first_name,
    middle_name = v_middle_name,
    dob = v_dob,
    gender_id = v_gender_id
  WHERE
    id = v_e_person_id
  RETURNING
    *
)
INSERT INTO
  persons.e_person_log (
    d_operation_type_id,
    user_id,
    e_person_id,
    iin,
    last_name,
    first_name,
    middle_name,
    dob,
    gender_id,
    is_deleted
  )
VALUES (
  2,
  v_user_id,
  (SELECT id FROM upd),
  (SELECT iin FROM upd),
  (SELECT last_name FROM upd),
  (SELECT first_name FROM upd),
  (SELECT middle_name FROM upd),
  (SELECT dob FROM upd),
  (SELECT gender_id FROM upd),
  (SELECT is_deleted FROM upd) -- TODO: test with func
)
RETURNING
  (SELECT id FROM upd) "e_person_id";
$$ LANGUAGE sql;
--============================================================================--
-- Delete person (delete_person)
--============================================================================--
CREATE FUNCTION persons.delete_person (
  IN v_e_person_id INTEGER,
  IN v_user_id INTEGER,
  OUT e_person_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    persons.e_person
  SET
    is_deleted = TRUE
  WHERE
    id = v_e_person_id
  RETURNING
    *
)
INSERT INTO
  persons.e_person_log (
    d_operation_type_id,
    user_id,
    e_person_id,
    iin,
    last_name,
    first_name,
    middle_name,
    dob,
    gender_id,
    is_deleted
  )
VALUES (
  3,
  v_user_id,
  (SELECT id FROM upd),
  (SELECT iin FROM upd),
  (SELECT last_name FROM upd),
  (SELECT first_name FROM upd),
  (SELECT middle_name FROM upd),
  (SELECT dob FROM upd),
  (SELECT gender_id FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  (SELECT id FROM upd) "e_person_id";
$$ LANGUAGE sql;
--============================================================================--
-- Restore person (restore_person)
--============================================================================--
CREATE FUNCTION persons.restore_person (
  IN v_e_person_id INTEGER,
  IN v_user_id INTEGER,
  OUT e_person_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    persons.e_person
  SET
    is_deleted = FALSE
  WHERE
    id = v_e_person_id
  RETURNING
    *
)
INSERT INTO
  persons.e_person_log (
    d_operation_type_id,
    user_id,
    e_person_id,
    iin,
    last_name,
    first_name,
    middle_name,
    dob,
    gender_id,
    is_deleted
  )
VALUES (
  4,
  v_user_id,
  (SELECT id FROM upd),
  (SELECT iin FROM upd),
  (SELECT last_name FROM upd),
  (SELECT first_name FROM upd),
  (SELECT middle_name FROM upd),
  (SELECT dob FROM upd),
  (SELECT gender_id FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  (SELECT id FROM upd) "e_person_id";
$$ LANGUAGE sql;
--============================================================================--
-- Select person (select_person)
--============================================================================--
CREATE FUNCTION persons.select_person (
  IN v_e_person_id INTEGER,
  IN v_user_id INTEGER
)
RETURNS persons.e_person
AS $$
WITH sel AS (
  SELECT
    *
  FROM
    persons.e_person
  WHERE
    id = v_e_person_id
)
INSERT INTO
  persons.e_person_log (
    d_operation_type_id,
    user_id,
    e_person_id,
    iin,
    last_name,
    first_name,
    middle_name,
    dob,
    gender_id,
    is_deleted
  )
VALUES (
  5,
  v_user_id,
  (SELECT id FROM sel),
  (SELECT iin FROM sel),
  (SELECT last_name FROM sel),
  (SELECT first_name FROM sel),
  (SELECT middle_name FROM sel),
  (SELECT dob FROM sel),
  (SELECT gender_id FROM sel),
  (SELECT is_deleted FROM sel)
);
--============================================================================--
SELECT
  *
FROM
  persons.e_person
WHERE
  id = v_e_person_id;
$$ LANGUAGE sql;
--============================================================================--
-- Select persons (select_persons)
--============================================================================--
CREATE FUNCTION persons.select_persons ()
RETURNS SETOF persons.e_person
AS $$
SELECT
  id,
  iin,
  last_name,
  first_name,
  middle_name,
  dob,
  gender_id,
  is_deleted
FROM
  persons.e_person
ORDER BY
  id ASC;
$$ LANGUAGE sql;
--============================================================================--
