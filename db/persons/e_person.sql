CREATE TABLE persons.e_person (
  id SERIAL,
  iin CHAR (12),
  last_name VARCHAR (400) NOT NULL,
  first_name VARCHAR (300) NOT NULL,
  middle_name VARCHAR (500),
  dob DATE,
  gender_id CHAR(1) NOT NULL,
    is_deleted CHAR(1) NOT NULL DEFAULT 'F',
      PRIMARY KEY (id),
      UNIQUE (iin),
      FOREIGN KEY (gender_id) REFERENCES persons.d_gender (id),
      FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
);

INSERT INTO
  persons.e_person (
    iin,
    last_name,
    first_name,
    middle_name,
    dob,
    gender_id
  )
VALUES (
  '871215301496',
  'Маусумбаев',
  'Тимур',
  'Владимирович',
  '1987-12-15',
  'M'
);

CREATE TABLE persons.e_person_log (
  id SERIAL,
  d_operation_type_id INTEGER NOT NULL,
  operation_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
  user_id INTEGER NOT NULL,
  e_person_id INTEGER NOT NULL,
  iin CHAR (12),
  last_name VARCHAR (400) NOT NULL,
  first_name VARCHAR (300) NOT NULL,
  middle_name VARCHAR (500),
  dob DATE,
  gender_id CHAR(1),
    is_deleted CHAR(1) NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (d_operation_type_id) REFERENCES system.d_operation_type (id),
      FOREIGN KEY (user_id) REFERENCES users.e_user (id),
      FOREIGN KEY (e_person_id) REFERENCES persons.e_person (id)
);

CREATE FUNCTION persons.create_person (
  IN v_iin CHAR (12),
  IN v_last_name VARCHAR (400),
  IN v_first_name VARCHAR (300),
  IN v_middle_name VARCHAR (500),
  IN v_dob DATE,
  IN v_gender_id CHAR (1),
  IN v_user_id INTEGER,
  OUT v_person_id INTEGER
)
AS $$
WITH ins AS (
  INSERT INTO
    persons.e_person (
      iin,
      last_name,
      first_name,
      middle_name,
      dob,
      gender_id
    )
  VALUES (
    v_iin,
    v_last_name,
    v_first_name,
    v_middle_name,
    v_dob,
    v_gender_id
  )
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
  1,
  v_user_id,
  (SELECT id FROM ins),
  (SELECT iin FROM ins),
  (SELECT last_name FROM ins),
  (SELECT first_name FROM ins),
  (SELECT middle_name FROM ins),
  (SELECT dob FROM ins),
  (SELECT gender_id FROM ins),
  (SELECT is_deleted FROM ins)
)
RETURNING
  id "v_person_id";
$$ LANGUAGE sql;

SELECT
  create_person (
    '871215301501',
    'Дарибаев',
    'Арай',
    'Мэлсович',
    '1972-08-25',
    'M',
    1
  );

CREATE FUNCTION persons.update_person (
  IN v_id INTEGER,
  IN v_iin CHAR (12),
  IN v_last_name VARCHAR (400),
  IN v_first_name VARCHAR (300),
  IN v_middle_name VARCHAR (500),
  IN v_dob DATE,
  IN v_gender_id CHAR (1),
  IN v_user_id INTEGER,
  OUT v_person_id INTEGER
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
    id = v_id
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
  (SELECT is_deleted FROM persons.e_person WHERE id = v_id)
)
RETURNING
  (SELECT id FROM upd) "e_person_id";
$$ LANGUAGE sql;

CREATE FUNCTION persons.delete_person (
  IN v_e_person_id INTEGER,
  IN v_user_id INTEGER,
  OUT v_person_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    persons.e_person
  SET
    is_deleted = 'T'
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
  (SELECT id FROM upd) "v_person_id";
$$ LANGUAGE sql;

CREATE FUNCTION persons.restore_person (
  IN v_e_person_id INTEGER,
  IN v_user_id INTEGER,
  OUT v_person_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    persons.e_person
  SET
    is_deleted = 'F'
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
  (SELECT id FROM upd) "v_person_id";
$$ LANGUAGE sql;

CREATE FUNCTION persons.select_person (
  IN v_id INTEGER,
  IN v_user_id INTEGER,
  OUT v_person_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    persons.e_person
  SET
    is_deleted = 'F'
  WHERE
    id = v_id
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
  5,
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
