CREATE TABLE organizations.e_organization (
  id SERIAL,
  bin CHAR (12),
  short_name VARCHAR (1000) NOT NULL,
  official_name VARCHAR (4000),
  is_deleted CHAR (1) NOT NULL DEFAULT 'F',
    PRIMARY KEY (id),
    UNIQUE (bin),
    FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
);

CREATE TABLE organizations.e_organization_log (
  id SERIAL,
  d_operation_type_id INTEGER NOT NULL,
  operation_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
  user_id INTEGER NOT NULL,
  e_organization_id INTEGER NOT NULL,
  bin CHAR (12) NOT NULL,
  short_name VARCHAR (1000) NOT NULL,
  official_name VARCHAR (4000),
  is_deleted CHAR (1) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (d_operation_type_id) REFERENCES system.d_operation_type (id),
    FOREIGN KEY (user_id) REFERENCES users.e_user (id),
    FOREIGN KEY (e_organization_id) REFERENCES organizations.e_organization (id),
    FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
);

CREATE FUNCTION organizations.create_organization (
  IN v_bin CHAR (12),
  IN v_short_name VARCHAR (1000),
  IN v_official_name VARCHAR (4000),
  IN v_user_id INTEGER,
  OUT e_organization_id INTEGER
)
AS $$
WITH ins AS (
  INSERT INTO
    organizations.e_organization (
      bin,
      short_name,
      official_name
    )
  VALUES (
    v_bin,
    v_short_name,
    v_official_name
  )
  RETURNING
    *
)
INSERT INTO
  organizations.e_organization_log (
    d_operation_type_id,
    user_id,
    e_organization_id,
    bin,
    short_name,
    official_name,
    is_deleted
  )
VALUES (
  1,
  v_user_id,
  (SELECT id FROM ins),
  (SELECT bin FROM ins),
  (SELECT short_name FROM ins),
  (SELECT official_name FROM ins),
  (SELECT is_deleted FROM ins)
)
RETURNING
  (SELECT id FROM ins) "e_organization_id";
$$ LANGUAGE sql;

CREATE FUNCTION organizations.update_organization (
  IN v_e_organization_id INTEGER,
  IN v_bin CHAR (12),
  IN v_short_name VARCHAR (1000),
  IN v_official_name VARCHAR (4000),
  IN v_user_id INTEGER,
  OUT e_organization_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    organizations.e_organization
  SET
    bin = v_bin,
    short_name = v_short_name,
    official_name = v_official_name
  WHERE
    id = v_e_organization_id
  RETURNING
    *
)
INSERT INTO
  organizations.e_organization_log (
    d_operation_type_id,
    user_id,
    e_organization_id,
    bin,
    short_name,
    official_name,
    is_deleted
  )
VALUES (
  2,
  v_user_id,
  (SELECT id FROM upd),
  (SELECT bin FROM upd),
  (SELECT short_name FROM upd),
  (SELECT official_name FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  (SELECT id FROM upd) "e_organization_id";
$$ LANGUAGE sql;

CREATE FUNCTION organizations.select_organization (
  IN v_e_organization_id INTEGER,
  IN v_user_id INTEGER
)
RETURNS organizations.e_organization
AS $$
WITH sel AS (
  SELECT
    *
  FROM
    organizations.e_organization
  WHERE
    id = v_e_organization_id
)
INSERT INTO
  organizations.e_organization_log (
    d_operation_type_id,
    user_id,
    e_organization_id,
    bin,
    short_name,
    official_name,
    is_deleted
  )
VALUES (
  5,
  v_user_id,
  (SELECT id FROM sel),
  (SELECT bin FROM sel),
  (SELECT short_name FROM sel),
  (SELECT official_name FROM sel),
  (SELECT is_deleted FROM sel)
);
SELECT
  *
FROM
  organizations.e_organization
WHERE
  id = v_e_organization_id;
$$ LANGUAGE sql;

CREATE FUNCTION organizations.delete_organization (
  IN v_e_organization_id INTEGER,
  IN v_user_id INTEGER,
  OUT e_organization_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    organizations.e_organization
  SET
    is_deleted = 'T'
  WHERE
    id = v_e_organization_id
  RETURNING
    *
)
INSERT INTO
  organizations.e_organization_log (
    d_operation_type_id,
    user_id,
    e_organization_id,
    bin,
    short_name,
    official_name,
    is_deleted
  )
VALUES (
  3,
  v_user_id,
  (SELECT id FROM upd),
  (SELECT bin FROM upd),
  (SELECT short_name FROM upd),
  (SELECT official_name FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_organization_id;
$$ LANGUAGE sql;

CREATE FUNCTION organizations.restore_organization (
  IN v_e_organization_id INTEGER,
  IN v_user_id INTEGER,
  OUT e_organization_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    organizations.e_organization
  SET
    is_deleted = 'F'
  WHERE
    id = v_e_organization_id
  RETURNING
    *
)
INSERT INTO
  organizations.e_organization_log (
    d_operation_type_id,
    user_id,
    e_organization_id,
    bin,
    short_name,
    official_name,
    is_deleted
  )
VALUES (
  4,
  v_user_id,
  (SELECT id FROM upd),
  (SELECT bin FROM upd),
  (SELECT short_name FROM upd),
  (SELECT official_name FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_organization_id;
$$ LANGUAGE sql;
