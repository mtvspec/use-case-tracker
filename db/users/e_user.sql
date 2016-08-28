CREATE TABLE users.e_user (
  id SERIAL,
  e_person_id INTEGER NOT NULL,
  u_username VARCHAR (20) NOT NULL,
  u_password VARCHAR (4000) NOT NULL,
  status_id INTEGER NOT NULL DEFAULT 1,
    is_deleted CHAR (1) NOT NULL DEFAULT 'F',
      PRIMARY KEY (id),
      UNIQUE (v_username),
      FOREIGN KEY (e_person_id) REFERENCES persons.e_person (id),
      FOREIGN KEY (status_id) REFERENCES users.d_user_status (id),
      FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
);

INSERT INTO
  users.e_user (
    e_person_id,
    v_username,
    v_password
  )
VALUES (
  1,
  'mtvspec',
  'PASSWORD'
);

CREATE TABLE users.d_user_status (
  id SERIAL,
  cr_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO
  users.d_user_status
VALUES
(
  DEFAULT
),
(
  DEFAULT
);

CREATE TABLE users.tr_user_status (
  id SERIAL,
  status_en VARCHAR (1000) NOT NULL,
  status_ru VARCHAR (1000),
  status_kz VARCHAR (1000),
    PRIMARY KEY (id),
    UNIQUE (status_en),
    UNIQUE (status_ru),
    UNIQUE (status_kz),
    UNIQUE (status_en, status_ru, status_kz)
);

INSERT INTO
  users.tr_user_status (
    status_en
  )
VALUES
(
  'Active'
),
(
  'Blocked'
);

CREATE TABLE users.r_user_status (
  id SERIAL,
  d_user_status_id INTEGER NOT NULL,
  tr_user_status_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (d_user_status_id) REFERENCES users.d_user_status (id),
    FOREIGN KEY (tr_user_status_id) REFERENCES users.tr_user_status (id)
);

INSERT INTO
  users.r_user_status (
    d_user_status_id,
    tr_user_status_id
  )
VALUES
(
  1,
  1
),
(
  2,
  2
);

CREATE VIEW users.v_user_status
AS
SELECT
  s.id,
  tr.status_en,
  tr.status_ru,
  tr.status_kz
FROM
  users.d_user_status s,
  users.tr_user_status tr,
  users.r_user_status r
WHERE
  r.d_user_status_id = s.id
AND
  r.tr_user_status_id = tr.id
ORDER BY
  s.id ASC;

CREATE TABLE users.e_user_log (
  id SERIAL,
  d_operation_type_id INTEGER NOT NULL,
  operation_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
  user_id INTEGER NOT NULL,
  e_user_id INTEGER NOT NULL,
  e_person_id INTEGER NOT NULL,
  u_username VARCHAR (20) NOT NULL,
  u_password VARCHAR (4000) NOT NULL,
  status_id INTEGER NOT NULL,
    is_deleted CHAR(1) NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (d_operation_type_id) REFERENCES system.d_operation_type (id),
      FOREIGN KEY (user_id) REFERENCES users.e_user (id),
      FOREIGN KEY (e_user_id) REFERENCES users.e_user (id),
      FOREIGN KEY (e_person_id) REFERENCES persons.e_person (id),
      FOREIGN KEY (status_id) REFERENCES users.d_user_status (id),
      FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
);
/*
create_user (v_e_person_id, v_username, v_password, v_user);
return v_user_id (created user id);
*/
CREATE FUNCTION users.create_user (
  IN v_e_person_id INTEGER,
  IN v_username VARCHAR (20),
  IN v_password VARCHAR (4000),
  IN v_user INTEGER,
  OUT e_user_id INTEGER
)
AS $$
WITH ins AS (
  INSERT INTO
    users.e_user (
      e_person_id,
      u_username,
      u_password
    )
  VALUES (
    v_e_person_id,
    v_username,
    v_password
  )
  RETURNING
    *
)
INSERT INTO
  users.e_user_log (
    d_operation_type_id,
    user_id,
    e_user_id,
    e_person_id,
    u_username,
    u_password,
    status_id,
    is_deleted
  )
VALUES (
  1,
  v_user,
  (SELECT id FROM ins),
  (SELECT e_person_id FROM ins),
  (SELECT u_username FROM ins),
  'PASSWORD',
  (SELECT status_id FROM ins),
  (SELECT is_deleted FROM ins)
)
RETURNING
  e_user_id;
$$ LANGUAGE sql;

SELECT
  create_user (
    2
  )

/*
update_user_status (v_user_id, v_status_id, v_user);
return user_id (updated users id);
*/
CREATE FUNCTION users.update_user_status (
  IN v_user_id INTEGER,
  IN v_status_id INTEGER,
  IN v_user INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    users.e_user
  SET
    status_id = v_status_id
  WHERE
    id = v_user_id
  RETURNING
    *
)
INSERT INTO
  users.e_user_log (
    d_operation_type_id,
    user_id,
    e_user_id,
    e_person_id,
    u_username,
    u_password
  )
VALUES (
  2,
  v_user,
  (SELECT id FROM upd),
  (SELECT e_person_id FROM upd),
  (SELECT u_username FROM upd),
  'PASSWORD',
  (SELECT status_id FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  (SELECT id FROM upd) "v_user_id";
$$ LANGUAGE sql;
/*
change_user_password (v_user_id, v_password, v_user);
return user_id (updated users id);
*/
CREATE FUNCTION users.change_user_password (
  IN v_user_id INTEGER,
  IN v_password VARCHAR (4000),
  IN v_user INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    users.e_user
  SET
    u_password = v_password
  WHERE
    id = v_user_id
  RETURNING
    *
)
INSERT INTO
  users.e_user_log (
    d_operation_type_id,
    user_id,
    e_user_id,
    e_person_id,
    u_username,
    u_password
  )
VALUES (
  2,
  v_user,
  (SELECT id FROM upd),
  (SELECT e_person_id FROM upd),
  (SELECT u_username FROM upd),
  'NEW PASSWORD',
  (SELECT status_id FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  (SELECT id FROM upd) "v_user_id";
$$ LANGUAGE sql;
/*
delete_user (v_user_id, v_user);
return user_id (deleted user id);
*/
CREATE FUNCTION users.delete_user (
  IN v_user_id INTEGER,
  IN v_user INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    users.e_user
  SET
    is_deleted = 'T'
  WHERE
    id = v_user_id
  RETURNING
    *
)
INSERT INTO
  users.e_user_log (
    d_operation_type_id,
    user,
    e_user_id,
    e_person_id,
    u_username,
    u_password
  )
VALUES (
  3,
  v_user,
  (SELECT id FROM upd),
  (SELECT e_person_id FROM upd),
  (SELECT u_username FROM upd),
  'PASSWORD',
  (SELECT status_id FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  (SELECT id FROM upd) "v_user_id";
$$ LANGUAGE sql;
/*
restore_user (v_user_id, v_user);
return user_id (restored user id);
*/
CREATE FUNCTION users.restore_user (
  IN v_user_id INTEGER,
  IN v_password VARCHAR (4000),
  IN v_user INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    users.e_user
  SET
    is_deleted = 'F'
  WHERE
    id = v_user_id
  RETURNING
    *
)
INSERT INTO
  users.e_user_log (
    d_operation_type_id,
    user,
    e_user_id,
    e_person_id,
    u_username,
    u_password
  )
VALUES (
  4,
  v_user,
  (SELECT id FROM upd),
  (SELECT e_person_id FROM upd),
  (SELECT u_username FROM upd),
  'PASSWORD',
  (SELECT status_id FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  (SELECT id FROM upd) "v_user_id";
$$ LANGUAGE sql;
/*
select_user (v_user_id, v_user);
return user;
*/
CREATE FUNCTION select_user (
  IN v_user_id INTEGER,
  IN v_user INTEGER
)
RETURNS users.e_user
AS $$
WITH sel AS (
  SELECT
    id,
    e_person_id,
    u_username,
    status_id,
    is_deleted
  FROM
    users.e_user
  WHERE
    id = v_user_id
)
INSERT INTO
  users.e_user_log (
    d_operation_type_id,
    user,
    e_user_id,
    e_person_id,
    u_username,
    u_password,
    status_id,
    is_deleted
  )
VALUES (
  5,
  v_user_id,
  (SELECT id FROM sel),
  (SELECT e_person_id FROM sel),
  (SELECT u_username FROM sel),
  'PASSWORD',
  (SELECT status_id FROM sel),
  (SELECT is_deleted FROM sel)
)
RETURNING
  (SELECT
    id,
    e_person_id,
    u_username,
    status_id,
    is_deleted
  FROM
    sel);
$$ LANGUAGE sql;
