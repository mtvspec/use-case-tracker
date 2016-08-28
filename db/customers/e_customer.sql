CREATE TABLE customers.e_customer (
  id SERIAL,
  e_organization_id INTEGER NOT NULL,
  a_name VARCHAR (1000) NOT NULL,
  a_description VARCHAR (4000),
    is_deleted CHAR (1) NOT NULL DEFAULT 'F',
      PRIMARY KEY (id),
      FOREIGN KEY (e_organization_id) REFERENCES organizations.e_organization (id),
      FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
);

CREATE TABLE customers.e_customer_log (
  id SERIAL,
  d_operation_type_id INTEGER NOT NULL,
  operation_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
  user_id INTEGER NOT NULL,
  e_customer_id INTEGER NOT NULL,
  e_organization_id INTEGER NOT NULL,
  a_name VARCHAR (1000) NOT NULL,
  a_description VARCHAR (4000),
    is_deleted CHAR (1) NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (d_operation_type_id) REFERENCES system.d_operation_type (id),
      FOREIGN KEY (user_id) REFERENCES users.e_user (id),
      FOREIGN KEY (e_customer_id) REFERENCES customers.e_customer (id),
      FOREIGN KEY (e_organization_id) REFERENCES organizations.e_organization (id),
      FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
);

CREATE TABLE customers.create_customer (
  IN v_e_organization_id INTEGER,
  IN v_name VARCHAR (1000),
  IN v_description VARCHAR (4000),
  IN v_user_id INTEGER,
  OUT e_customer_id INTEGER
)
AS $$
WITH ins AS (
  INSERT INTO
    customers.e_customer (
      e_organization_id,
      c_name,
      c_description
    )
  VALUES (
    v_e_organization_id,
    v_name,
    v_description
  )
  RETURNING
    *
)
INSERT INTO
  customers.e_customer_log (
    d_operation_type_id,
    user_id,
    e_customer_id,
    e_organization_id,
    a_name,
    a_description,
    is_deleted
  )
VALUES (
  1,
  v_user_id,
  (SELECT id FROM ins),
  (SELECT e_organization_id FROM ins),
  (SELECT a_name FROM ins),
  (SELECT a_description FROM ins),
  (SELECT is_deleted FROM ins)
)
RETURNING
  e_customer_id;
$$ LANGUAGE sql;

CREATE FUNCTION customers.update_customer (
  IN v_e_customer_id INTEGER,
  IN v_e_organization_id INTEGER,
  IN v_a_name VARCHAR (1000),
  IN v_a_description VARCHAR (4000),
  IN v_user_id INTEGER,
  OUT e_customer_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    customers.e_customer
  SET
    e_organization_id = v_e_organization_id,
    a_name = v_a_name,
    a_description = v_a_descrition
  WHERE
    id = v_e_customer_id
  RETURNING
    *
)
INSERT INTO
  customers.e_customer_log (
    d_operation_type_id,
    user_id,
    e_customer_id,
    e_organization_id,
    a_name,
    a_description,
    is_deleted
  )
VALUES (
  2,
  v_user_id,
  (SELECT id FROM upd),
  (SELECT e_organization_id FROM upd),
  (SELECT a_name FROM upd),
  (SELECT a_description FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_customer_id;
$$ LANGUAGE sql;

CREATE FUNCTION customers.delete_customer (
  IN v_e_customer_id INTEGER,
  IN v_user_id INTEGER,
  OUT e_customer_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    customers.e_customer
  SET
    is_deleted = 'T'
  WHERE
    id = v_e_customer_id
  RETURNING
    *
)
INSERT INTO
  customers.e_customer_log (
    d_operation_type_id,
    user_id,
    e_customer_id,
    e_organization_id,
    a_name,
    a_description,
    is_deleted
  )
VALUES (
  3,
  v_user_id,
  (SELECT id FROM upd),
  (SELECT e_organization_id FROM upd),
  (SELECT a_name FROM upd),
  (SELECT a_description FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_customer_id;
$$ LANGUAGE sql;
