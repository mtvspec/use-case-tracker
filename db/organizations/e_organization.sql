CREATE TABLE organizations.e_organization (
  id SERIAL,
  bin CHAR (12),
  name VARCHAR (1000) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (bin)
);

CREATE TABLE organizations.e_organization_log (
  id SERIAL,
  d_operation_type_id INTEGER NOT NULL,
  operation_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
  user_id INTEGER NOT NULL,
  e_organization_id INTEGER NOT NULL,
  bin CHAR (12) NOT NULL,
  name VARCHAR (1000) NOT NULL,
  is_deleted CHAR (1) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (bin),
    FOREIGN KEY (d_operation_type_id) REFERENCES system.d_operation_type (id),
    FOREIGN KEY (user_id) REFERENCES users.e_user (id),
    FOREIGN KEY (e_organization_id) REFERENCES organizations.e_organization (id),
    FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
);

CREATE FUNCTION organizations.create_organization (
  IN v_bin CHAR (12),
  IN v_name VARCHAR (1000),
  IN v_user_id INTEGER,
  OUT e_organization_id INTEGER
)
AS $$
WITH ins AS (
  INSERT INTO
    organizations.e_organization (
      bin,
      name
    )
  VALUES (
    v_bin,
    v_name
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
    name
  )
VALUES (
  1,
  v_user_id,
  (SELECT id FROM ins),
  (SELECT bin FROM ins),
  (SELECT name FROM ins)
)
RETURNING
  e_organization_id;
$$ LANGUAGE sql;
