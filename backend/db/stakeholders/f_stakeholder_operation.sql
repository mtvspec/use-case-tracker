--============================================================================--
-- Stakeholder operation (f_stakeholder_operation)
--============================================================================--
CREATE TABLE stakeholders.f_stakeholder_operation (
  id BIGSERIAL,
  d_stakeholder_operation_type_id INTEGER NOT NULL,
  a_operation_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_user_id BIGINT NOT NULL,
  e_person_id BIGINT NOT NULL,
  a_stakeholder_desc TEXT NOT NULL,
    is_deleted BOOLEAN NOT NULL,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        d_stakeholder_operation_type_id
      ) REFERENCES stakeholders.d_stakeholder_operation (id),
      FOREIGN KEY (
        e_user_id
      ) REFERENCES users.e_user (id),
      FOREIGN KEY (
        e_person_id
      ) REFERENCES persons.e_person (id)
);
--============================================================================--
-- Create stakeholder (create_stakeholder)
--============================================================================--
CREATE FUNCTION stakeholders.create_stakeholder (
  IN v_e_person_id BIGINT,
  IN v_a_stakeholder_desc TEXT,
  IN v_e_user_id BIGINT,
  OUT e_stakeholder_id BIGINT
)
AS $$
WITH ins AS (
  INSERT INTO
    stakeholders.e_stakeholder (
      e_person_id,
      a_stakeholder_desc
    )
  VALUES (
    v_e_person_id,
    v_a_stakeholder_desc
  )
  RETURNING
    *
)
INSERT INTO
  stakeholders.e_stakeholder_log (
    d_stakeholder_operation_type_id,
    e_user_id,
    e_stakeholder_id,
    e_person_id,
    a_stakeholder_desc,
    is_deleted
  )
VALUES (
  1,
  v_e_user_id,
  (SELECT id FROM ins),
  (SELECT e_person_id FROM ins),
  (SELECT a_stakeholder_desc FROM ins),
  (SELECT is_deleted FROM ins)
)
RETURNING
  e_stakeholder_id;
$$ LANGUAGE sql;
--============================================================================--
-- Update stakeholder (update_stakeholder)
--============================================================================--
CREATE FUNCTION stakeholders.update_stakeholder (
  IN v_e_stakeholder_id BIGINT,
  IN v_e_person_id BIGINT,
  IN v_a_stakeholder_desc TEXT,
  IN v_e_user_id BIGINT,
  OUT e_stakeholder_id BIGINT
)
AS $$
WITH upd AS (
  UPDATE
    stakeholders.e_stakeholder_log
  SET
    e_person_id = v_e_person_id,
    a_stakeholder_desc = v_a_stakeholder_desc
  WHERE
    id = v_e_stakeholder_id
  RETURNING
    *
)
INSERT INTO
  stakeholders.e_stakeholder_log (
    d_stakeholder_operation_type_id,
    e_user_id,
    e_stakeholder_id,
    e_person_id,
    a_stakeholder_desc,
    is_deleted
  )
VALUES (
  2,
  v_e_user_id,
  (SELECT id FROM upd),
  (SELECT e_person_id FROM upd),
  (SELECT a_stakeholder_desc FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_stakeholder_id;
$$ LANGUAGE sql;
--============================================================================--
-- Delete stakeholder (delete_stakeholder)
--============================================================================--
CREATE FUNCTION stakeholders.delete_stakeholder (
  IN v_e_stakeholder_id BIGINT,
  IN v_e_user BIGINT,
  OUT e_stakeholder_id BIGINT
)
AS $$
WITH upd AS (
  UPDATE
    stakeholders.e_stakeholder
  SET
    is_deleted = TRUE
  WHERE
    id = v_e_stakeholder_id
  RETURNING
    *
)
INSERT INTO
  stakeholders.e_stakeholder_log (
    d_stakeholder_operation_type_id,
    e_user_id,
    e_stakeholder_id,
    e_person_id,
    a_stakeholder_desc,
    is_deleted
  )
VALUES (
  3,
  v_e_user,
  (SELECT id FROM upd),
  (SELECT e_person_id FROM upd),
  (SELECT a_stakeholder_desc FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_stakeholder_id;
$$ LANGUAGE sql;
--============================================================================--
-- Restore stakeholder (restore_stakeholder)
--============================================================================--
CREATE FUNCTION stakeholders.restore_stakeholder (
  IN v_e_stakeholder_id BIGINT,
  IN v_e_user BIGINT,
  OUT e_stakeholder_id BIGINT
)
AS $$
WITH upd AS (
  UPDATE
    stakeholders.e_stakeholder
  SET
    is_deleted = FALSE
  WHERE
    id = v_e_stakeholder_id
  RETURNING
    *
)
INSERT INTO
  stakeholders.e_stakeholder_log (
    d_stakeholder_operation_type_id,
    e_user_id,
    e_stakeholder_id,
    e_person_id,
    a_stakeholder_desc,
    is_deleted
  )
VALUES (
  4,
  v_e_user,
  (SELECT id FROM upd),
  (SELECT e_person_id FROM upd),
  (SELECT a_stakeholder_desc FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_stakeholder_id;
$$ LANGUAGE sql;
--============================================================================--
