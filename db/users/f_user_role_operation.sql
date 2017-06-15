--============================================================================--
-- User role operation (f_user_role_operation)
--============================================================================--
CREATE TABLE users.f_user_role_operation (
  id BIGSERIAL,
  d_user_role_operation_type_id INTEGER NOT NULL,
  a_operation_ts TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_session_id BIGINT NOT NULL,
  e_user_id BIGINT NOT NULL,
  r_e_user_d_user_role_id BIGINT NOT NULL,
  e_target_e_user_id BIGINT NOT NULL,
  d_user_role_id BIGINT NOT NULL,
  is_deleted BOOLEAN NOT NULL,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      d_user_role_operation_type_id
    ) REFERENCES users.d_user_role_operation (id),
    FOREIGN KEY (
      e_session_id
    ) REFERENCES sessions.e_session (id),
    FOREIGN KEY (
      e_user_id
    ) REFERENCES users.e_user (id),
    FOREIGN KEY (
      r_e_user_d_user_role_id
    ) REFERENCES users.r_e_user_d_user_role (id),
    FOREIGN KEY (
      e_target_e_user_id
    ) REFERENCES users.e_user (id),
    FOREIGN KEY (
      d_user_role_id
    ) REFERENCES users.d_user_role (id)
);
--============================================================================--
-- Add user role (add_user_role)
--============================================================================--
CREATE FUNCTION users.add_user_role (
  IN v_e_target_e_user_id BIGINT,
  IN v_d_user_role_id INTEGER,
  IN v_e_session_id BIGINT,
  IN v_e_user_id BIGINT,
  OUT e_target_e_user_id BIGINT
)
AS $$
WITH ins AS (
  INSERT INTO
    users.r_e_user_d_user_role (
      e_user_id,
      d_user_role_id
    )
  VALUES (
    v_e_target_e_user_id,
    v_d_user_role_id
  )
  RETURNING
    *
)
INSERT INTO
  users.f_user_role_operation (
    d_user_role_operation_type_id,
    e_session_id,
    e_user_id,
    r_e_user_d_user_role_id,
    e_target_e_user_id,
    d_user_role_id,
    is_deleted
  )
VALUES (
  1,
  v_e_session_id,
  v_e_user_id,
  (SELECT id FROM ins),
  (SELECT e_user_id FROM ins),
  (SELECT d_user_role_id),
  (SELECT is_deleted FROM ins)
)
RETURNING
  (SELECT e_user_id FROM ins) "e_target_e_user_id";
$$ LANGUAGE SQL;
--============================================================================--
SELECT
  users.add_user_role (
    v_e_target_e_user_id := ${user.eUserID},
    v_d_user_role_id := ${userRole.id},
    v_e_session_id := ${session.id},
    v_e_user_id := ${user.id}
  );
--============================================================================--
-- Change user role (change_user_role)
--============================================================================--
CREATE FUNCTION users.change_user_role (
  IN v_r_e_user_d_user_role_id BIGINT,
  IN v_d_user_role_id INTEGER,
  IN v_e_session_id BIGINT,
  IN v_e_user_id BIGINT,
  OUT e_target_e_user_id BIGINT
)
AS $$
WITH upd AS (
  UPDATE
    users.r_e_user_d_user_role
  SET
    d_user_role_id = v_d_user_role_id
  WHERE
    id = v_r_e_user_d_user_role_id
  RETURNING
    *
)
INSERT INTO
  users.f_user_role_operation (
    d_user_role_operation_type_id,
    e_session_id,
    e_user_id,
    r_e_user_d_user_role_id,
    e_target_e_user_id,
    d_user_role_id,
    is_deleted
  )
VALUES (
  2,
  v_e_session_id,
  v_e_user_id,
  (SELECT id FROM upd),
  (SELECT e_user_id FROM upd),
  (SELECT d_user_role_id FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  (SELECT e_user_id FROM upd) "e_target_e_user_id";
$$ LANGUAGE SQL;
--============================================================================--
SELECT
  users.change_user_role (
    v_r_e_user_d_user_role_id := ${rUserRole.id},
    v_d_user_role_id := ${userRole.id},
    v_e_session_id := ${session.id},
    v_e_user_id := ${user.id}
  );
--============================================================================--
-- Remove user role (remove_user_role)
--============================================================================--
CREATE FUNCTION users.remove_user_role (
  IN v_r_e_user_d_user_role_id BIGINT,
  IN v_e_session_id BIGINT,
  IN v_e_user_id BIGINT,
  OUT e_target_e_user_id BIGINT
)
WITH upd AS (
  UPDATE
    users.r_e_user_d_user_role
  SET
    is_deleted = TRUE
  WHERE
    id = v_r_e_user_d_user_role_id
  RETURNING
    *
)
INSERT INTO
  users.f_user_role_operation (
    d_user_role_operation_type_id,
    e_session_id,
    e_user_id,
    r_e_user_d_user_role_id,
    e_target_e_user_id,
    d_user_role_id,
    is_deleted
  )
VALUES (
  3,
  v_e_session_id,
  v_e_user_id,
  (SELECT id FROM upd),
  (SELECT e_user_id FROM upd),
  (SELECT d_user_role_id FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  (SELECT e_user_id FROM upd) "e_target_e_user_id";
$$ LANGUAGE SQL;
--============================================================================--
SELECT
  users.remove_user_role (
    v_r_e_user_d_user_role_id := ${rUserRole.id},
    v_e_session_id := ${session.id},
    v_e_user_id := ${user.id}
  );
--============================================================================--
