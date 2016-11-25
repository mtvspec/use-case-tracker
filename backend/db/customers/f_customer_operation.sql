--============================================================================--
-- Customer operation (f_customer_operation)
--============================================================================--
CREATE TABLE customers.f_customer_operation (
  id BIGSERIAL,
  d_customer_operation_type_id INTEGER NOT NULL,
  operation_timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_user_id BIGINT NOT NULL,
  e_customer_id BIGINT NOT NULL,
  e_organization_id BIGINT NOT NULL,
  a_customer_short_name VARCHAR (1000) NOT NULL,
  a_customer_full_name VARCHAR (1000),
  a_customer_desc TEXT,
    is_deleted BOOLEAN NOT NULL,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        d_customer_operation_type_id
      ) REFERENCES customer.d_customer_operation (id),
      FOREIGN KEY (
        e_user_id
      ) REFERENCES users.e_user (id),
      FOREIGN KEY (
        e_customer_id
      ) REFERENCES customers.e_customer (id),
      FOREIGN KEY (
        e_organization_id
      ) REFERENCES organizations.e_organization (id)
);
--============================================================================--
-- Create customer (create_customer)
--============================================================================--
CREATE TABLE customers.create_customer (
  IN v_e_organization_id BIGINT,
  IN v_a_customer_short_name VARCHAR (1000),
  IN v_a_customer_full_name VARCHAR (1000),
  IN v_a_customer_desc TEXT,
  IN v_e_user_id BIGINT,
  OUT e_customer_id BIGINT
)
AS $$
WITH ins AS (
  INSERT INTO
    customers.e_customer (
      e_organization_id,
      a_customer_short_name,
      a_customer_full_name,
      a_customer_desc
    )
  VALUES (
    v_e_organization_id,
    v_a_customer_short_name,
    v_a_customer_full_name,
    v_a_customer_desc
  )
  RETURNING
    *
)
INSERT INTO
  customers.e_customer_log (
    d_operation_type_id,
    e_user_id,
    e_customer_id,
    e_organization_id,
    a_customer_short_name,
    a_customer_full_name,
    a_customer_desc,
    is_deleted
  )
VALUES (
  1,
  v_e_user_id,
  (SELECT id FROM ins),
  (SELECT e_organization_id FROM ins),
  (SELECT a_customer_short_name FROM ins),
  (SELECT a_customer_full_name FROM ins),
  (SELECT a_customer_desc FROM ins),
  (SELECT is_deleted FROM ins)
)
RETURNING
  e_customer_id;
$$ LANGUAGE sql;
--============================================================================--
-- Update customer (update_customer)
--============================================================================--
CREATE FUNCTION customers.update_customer (
  IN v_e_customer_id BIGINT,
  IN v_e_organization_id BIGINT,
  IN v_a_customer_short_name VARCHAR (1000),
  IN v_a_customer_full_name VARCHAR (1000),
  IN v_a_customer_desc TEXT,
  IN v_e_user_id BIGINT,
  OUT e_customer_id BIGINT
)
AS $$
WITH upd AS (
  UPDATE
    customers.e_customer
  SET
    e_organization_id = v_e_organization_id,
    a_customer_short_name = v_a_customer_short_name,
    a_customer_full_name = v_a_customer_full_name,
    a_customer_desc = v_a_customer_desc
  WHERE
    id = v_e_customer_id
  RETURNING
    *
)
INSERT INTO
  customers.e_customer_log (
    d_operation_type_id,
    e_user_id,
    e_customer_id,
    e_organization_id,
    a_customer_short_name,
    a_customer_full_name,
    a_customer_desc,
    is_deleted
  )
VALUES (
  2,
  v_user_id,
  (SELECT id FROM upd),
  (SELECT e_organization_id FROM upd),
  (SELECT a_customer_short_name FROM upd),
  (SELECT a_customer_full_name FROM upd),
  (SELECT a_customer_desc FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_customer_id;
$$ LANGUAGE sql;
--============================================================================--
-- Delete customer (delete_customer)
--============================================================================--
CREATE FUNCTION customers.delete_customer (
  IN v_e_customer_id BIGINT,
  IN v_e_user_id BIGINT,
  OUT e_customer_id BIGINT
)
AS $$
WITH upd AS (
  UPDATE
    customers.e_customer
  SET
    is_deleted = TRUE
  WHERE
    id = v_e_customer_id
  RETURNING
    *
)
INSERT INTO
  customers.e_customer_log (
    d_operation_type_id,
    e_user_id,
    e_customer_id,
    e_organization_id,
    a_customer_short_name,
    a_customer_full_name,
    a_customer_desc,
    is_deleted
  )
VALUES (
  3,
  v_e_user_id,
  (SELECT id FROM upd),
  (SELECT e_organization_id FROM upd),
  (SELECT a_customer_short_name FROM upd),
  (SELECT a_customer_full_name FROM upd),
  (SELECT a_customer_desc FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_customer_id;
$$ LANGUAGE sql;
--============================================================================--
-- Restore customer (restore_customer)
--============================================================================--
CREATE FUNCTION customers.restore_customer (
  IN v_e_customer_id BIGINT,
  IN v_e_user_id BIGINT,
  OUT e_customer_id BIGINT
)
AS $$
WITH upd AS (
  UPDATE
    customers.e_customer
  SET
    is_deleted = FALSE
  WHERE
    id = v_e_customer_id
  RETURNING
    *
)
INSERT INTO
  customers.e_customer_log (
    d_operation_type_id,
    e_user_id,
    e_customer_id,
    e_organization_id,
    a_customer_short_name,
    a_customer_full_name,
    a_customer_desc,
    is_deleted
  )
VALUES (
  4,
  v_e_user_id,
  (SELECT id FROM upd),
  (SELECT e_organization_id FROM upd),
  (SELECT a_customer_short_name FROM upd),
  (SELECT a_customer_full_name FROM upd),
  (SELECT a_customer_desc FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_customer_id;
$$ LANGUAGE sql;
--============================================================================--
