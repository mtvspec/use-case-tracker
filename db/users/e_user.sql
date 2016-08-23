CREATE TABLE users.e_user (
  id SERIAL,
  e_person_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (e_person_id) REFERENCES persons.e_person (id)
);

INSERT INTO
  users.e_user (
    e_person_id
  )
VALUES (
  1
);

CREATE FUNCTION create_user (
  IN v_username VARCHAR (20),
  IN v_password VARCHAR (4000),
  IN v_user_id INTEGER,
  OUT v_user_id INTEGER
)
AS &&
WITH ins AS (
  INSERT INTO
    users.e_user (
      u_username,
      u_password
    )
  VALUES (
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
    v_username,
    v_password
  )
VALUES (
  1,
  v_user_id,
  (SELECT u_username FROM ins),
  'NEW PASSWORD'
)
RETURNING
  (SELECT id FROM ins) "v_user_id";
$$ LANGUAGE sql;
