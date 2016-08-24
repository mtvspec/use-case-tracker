CREATE TABLE stakeholders.e_stakeholder (
  id SERIAL,
  e_person_id INTEGER NOT NULL,
  description VARCHAR (4000),
  is_deleted CHAR (1) NOT NULL DEFAULT 'F',
      PRIMARY KEY (id),
      UNIQUE (e_person_id),
      FOREIGN KEY (e_person_id) REFERENCES persons.e_person (id),
      FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
);

CREATE TABLE stakeholders.e_stakeholder_log (
  id SERIAL,
  d_operation_type_id INTEGER NOT NULL,
  operation_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
  user_id INTEGER NOT NULL,
  e_person_id INTEGER NOT NULL,
  description VARCHAR (4000),
  is_deleted CHAR (1) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (d_operation_type_id) REFERENCES system.d_operation_type (id),
    FOREIGN KEY (user_id) REFERENCES users.e_user (id),
    FOREIGN KEY (e_person_id) REFERENCES persons.e_person (id),
    FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
);

CREATE FUNCTION stakeholders.create_stakeholder (
  IN v_e_person_id INTEGER,
  IN v_description VARCHAR (4000),
  IN v_user_id INTEGER,
  OUT e_stakeholder_id INTEGER
)
AS $$
WITH ins AS (
  INSERT INTO
    stakeholders.e_stakeholder (
      e_person_id,
      description
    )
  VALUES (
    v_e_person_id,
    v_description
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
    description,
    is_deleted
  )
VALUES (
  1,
  v_user_id,
  (SELECT id FROM ins),
  (SELECT e_person_id FROM ins),
  (SELECT description FROM ins),
  (SELECT is_deleted FROM ins)
)
RETURNING
  e_stakeholder_id;
$$ LANGUAGE sql;
