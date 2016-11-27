--============================================================================--
-- Organization operation (f_organization_operation)
--============================================================================--
CREATE TABLE organizations.f_organization_operation (
  id BIGSERIAL,
  d_organization_operation_type_id INTEGER NOT NULL,
  d_operation_timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_user_id BIGINT NOT NULL,
  e_organization_id BIGINT NOT NULL,
  e_bin CHAR (12),
  a_organization_short_name VARCHAR (1000) NOT NULL,
  a_organization_official_name VARCHAR (4000),
    is_deleted BOOLEAN NOT NULL,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        d_operation_type_id
      ) REFERENCES organizations.d_organization_operation (id),
      FOREIGN KEY (
        e_user_id
      ) REFERENCES users.e_user (id),
      FOREIGN KEY (
        e_organization_id
      ) REFERENCES organizations.e_organization (id)
);
--============================================================================--
-- Create organization (create_organization)
--============================================================================--
CREATE FUNCTION organizations.create_organization (
  IN v_bin CHAR (12),
  IN v_a_organization_short_name VARCHAR (1000),
  IN v_a_organization_official_name VARCHAR (4000),
  IN v_e_user_id BIGINT,
  OUT e_organization_id BIGINT
)
AS $$
WITH ins AS (
  INSERT INTO
    organizations.e_organization (
      a_bin,
      a_organization_short_name,
      a_organization_official_name
    )
  VALUES (
    v_a_bin,
    v_a_organization_short_name,
    v_a_organization_official_name
  )
  RETURNING
    *
)
INSERT INTO
  organizations.f_organization_operation (
    d_operation_type_id,
    e_user_id,
    e_organization_id,
    a_bin,
    a_organization_short_name,
    a_organization_official_name,
    is_deleted
  )
VALUES (
  1,
  v_user_id,
  (SELECT id FROM ins),
  (SELECT a_bin FROM ins),
  (SELECT a_organization_short_name FROM ins),
  (SELECT a_organization_official_name FROM ins),
  (SELECT is_deleted FROM ins)
)
RETURNING
  (SELECT id FROM ins) "e_organization_id";
$$ LANGUAGE sql;
--============================================================================--
-- Update organization (update_organization)
--============================================================================--
CREATE FUNCTION organizations.update_organization (
  IN v_e_organization_id BIGINT,
  IN v_a_bin CHAR (12),
  IN v_a_organization_short_name VARCHAR (1000),
  IN v_a_organization_official_name VARCHAR (4000),
  IN v_e_user_id BIGINT,
  OUT e_organization_id BIGINT
)
AS $$
WITH upd AS (
  UPDATE
    organizations.e_organization
  SET
    a_bin = v_a_bin,
    a_organization_short_name = v_a_organization_short_name,
    a_organization_official_name = v_a_organization_official_name
  WHERE
    id = v_e_organization_id
  RETURNING
    *
)
INSERT INTO
  organizations.f_organization_operation (
    d_operation_type_id,
    e_user_id,
    e_organization_id,
    a_bin,
    a_organization_short_name,
    a_organization_official_name,
    is_deleted
  )
VALUES (
  2,
  v_user_id,
  (SELECT id FROM upd),
  (SELECT a_bin FROM upd),
  (SELECT a_organization_short_name FROM upd),
  (SELECT a_organization_official_name FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  (SELECT id FROM upd) "e_organization_id";
$$ LANGUAGE sql;
--============================================================================--
-- Select organization (select_organization)
--============================================================================--
CREATE FUNCTION organizations.select_organization (
  IN v_e_organization_id BIGINT,
  IN v_e_user_id BIGINT
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
    e_user_id,
    e_organization_id,
    a_bin,
    a_organization_short_name,
    a_organization_official_name,
    is_deleted
  )
VALUES (
  5,
  v_user_id,
  (SELECT id FROM sel),
  (SELECT a_bin FROM sel),
  (SELECT a_organization_short_name FROM sel),
  (SELECT a_organization_official_name FROM sel),
  (SELECT is_deleted FROM sel)
);
SELECT
  *
FROM
  organizations.e_organization
WHERE
  id = v_e_organization_id;
$$ LANGUAGE sql;
--============================================================================--
-- Delete organization (delete_organization)
--============================================================================--
CREATE FUNCTION organizations.delete_organization (
  IN v_e_organization_id BIGINT,
  IN v_e_user_id BIGINT,
  OUT e_organization_id BIGINT
)
AS $$
WITH upd AS (
  UPDATE
    organizations.e_organization
  SET
    is_deleted = TRUE
  WHERE
    id = v_e_organization_id
  RETURNING
    *
)
INSERT INTO
  organizations.e_organization_log (
    d_operation_type_id,
    e_user_id,
    e_organization_id,
    a_bin,
    a_organization_short_name,
    a_organization_official_name,
    is_deleted
  )
VALUES (
  3,
  v_user_id,
  (SELECT id FROM upd),
  (SELECT a_bin FROM upd),
  (SELECT a_organization_short_name FROM upd),
  (SELECT a_organization_official_name FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_organization_id;
$$ LANGUAGE sql;
--============================================================================--
-- Restore organization (restore_organization)
--============================================================================--
CREATE FUNCTION organizations.restore_organization (
  IN v_e_organization_id BIGINT,
  IN v_e_user_id BIGINT,
  OUT e_organization_id BIGINT
)
AS $$
WITH upd AS (
  UPDATE
    organizations.e_organization
  SET
    is_deleted = FALSE
  WHERE
    id = v_e_organization_id
  RETURNING
    *
)
INSERT INTO
  organizations.e_organization_log (
    d_operation_type_id,
    e_user_id,
    e_organization_id,
    a_bin,
    a_organization_short_name,
    a_organization_official_name,
    is_deleted
  )
VALUES (
  4,
  v_user_id,
  (SELECT id FROM upd),
  (SELECT a_bin FROM upd),
  (SELECT a_organization_short_name FROM upd),
  (SELECT a_organization_official_name FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_organization_id;
$$ LANGUAGE sql;
--============================================================================--
