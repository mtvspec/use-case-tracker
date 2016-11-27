--============================================================================--
-- User operation (f_user_operation)
--============================================================================--
CREATE TABLE users.f_user_operation (
  id BIGSERIAL,
  d_user_operation_type_id INTEGER NOT NULL,
  a_operation_ts TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_session_id BIGINT NOT NULL,
  e_user_id BIGINT NOT NULL,
  e_new_user_id BIGINT NOT NULL,
  e_person_id BIGINT NOT NULL,
  u_username VARCHAR (20) NOT NULL,
  u_password VARCHAR (4000),
  a_user_email VARCHAR (100) NOT NULL,
  d_user_state_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        d_user_operation_type_id
      ) REFERENCES users.d_user_operation (id),
      FOREIGN KEY (
        e_session_id
      ) REFERENCES sessions.e_session (id),
      FOREIGN KEY (
        e_user_id
      ) REFERENCES users.e_user (id),
      FOREIGN KEY (
        e_new_user_id) REFERENCES users.e_user (id),
      FOREIGN KEY (
        e_person_id
      ) REFERENCES persons.e_person (id),
      FOREIGN KEY (
        d_user_state_id
      ) REFERENCES users.d_user_state (id)
);
--============================================================================--
-- 1 - Create user (create_user)
--============================================================================--
CREATE FUNCTION users.create_user (
  IN v_e_person_id BIGINT,
  IN v_u_username VARCHAR (20),
  IN v_a_user_email VARCHAR (100),
  IN v_e_session_id BIGINT,
  IN v_e_user_id BIGINT,
  OUT e_user_id BIGINT
)
AS $$
WITH ins AS (
  INSERT INTO
    users.e_user (
      e_person_id,
      u_username,
      u_password,
      a_user_email
    )
  VALUES (
    v_e_person_id,
    v_u_username,
    v_u_password,
    v_a_user_email
  )
  RETURNING
    *
)
INSERT INTO
  users.f_user_operation (
    d_user_operation_type_id,
    e_session_id,
    e_user_id,
    e_new_user_id,
    e_person_id,
    u_username,
    u_password,
    a_user_email,
    d_user_state_id,
    is_deleted
  )
VALUES (
  1,
  v_e_session_id,
  v_e_user_id,
  (SELECT id FROM ins),
  (SELECT e_person_id FROM ins),
  (SELECT u_username FROM ins),
  'PASSWORD',
  (SELECT a_user_email FROM ins),
  (SELECT d_user_state_id FROM ins),
  (SELECT is_deleted FROM ins)
)
RETURNING
  (SELECT id FROM ins) "e_user_id";
$$ LANGUAGE sql;
--============================================================================--
SELECT
  users.create_user (
    v_e_person_id := ${user.ePersonID},
    v_u_username := '${user.uUsername}',
    v_u_password := '${user.uPassword}',
    v_a_user_email : = '${user.aUserEmail}',
    v_e_session_id := ${session.id},
    v_e_user_id := ${user.id}
  );
--============================================================================--
-- 2 - Change user password (change_user_password)
--============================================================================--
CREATE FUNCTION users.change_user_password (
  IN v_e_target_e_user_id BIGINT,
  IN v_u_password VARCHAR (4000),
  IN v_e_session_id BIGINT,
  IN v_e_user_id BIGINT,
  OUT e_target_e_user_id BIGINT
)
AS $$
WITH upd AS (
  UPDATE
    users.e_user
  SET
    u_password = v_u_password
  WHERE
    id = v_e_target_e_user_id
  RETURNING
    *
)
INSERT INTO
  users.f_user_operation (
    d_user_operation_type_id,
    e_session_id,
    e_user_id,
    e_person_id,
    u_username,
    u_password,
    a_user_email,
    d_user_state_id,
    is_deleted
  )
VALUES (
  2,
  v_e_session_id,
  v_e_user,
  (SELECT id FROM upd),
  (SELECT e_person_id FROM upd),
  (SELECT u_username FROM upd),
  'NEW PASSWORD',
  (SELECT a_user_email FROM upd),
  (SELECT d_user_state_id FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_target_e_user_id;
$$ LANGUAGE sql;
--============================================================================--
SELECT
  users.change_user_password (
    v_e_target_e_user_id := ${user.eUserID},
    v_u_password := '${user.uPassword}',
    v_e_session_id := ${session.id},
    v_e_user_id := ${user.id}
  );
--============================================================================--
-- 3 - Block user (block_user)
--============================================================================--
CREATE TABLE users.block_user (
  IN v_e_target_e_user_id BIGINT,
  IN v_e_session_id BIGINT,
  IN v_e_user_id BIGINT,
  OUT v_e_target_e_user_id BIGINT
)
AS $$
WITH upd AS (
  UPDATE
    users.e_user
  SET
    d_user_state_id = 2
  WHERE
    id = v_e_target_e_user_id
  RETURNING
    *
)
INSERT INTO
  users.f_user_operation (
    d_user_operation_type_id,
    e_session_id,
    e_user_id,
    e_target_e_user_id,
    u_username,
    u_password,
    a_user_email,
    d_user_state_id,
    is_deleted
  )
VALUES (
  3,
  v_e_session_id,
  v_e_user_id,
  (SELECT id FROM upd),
  (SELECT u_username FROM upd),
  (SELECT u_password FROM upd),
  (SELECT a_user_email FROM upd),
  (SELECT d_user_state_id FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_target_e_user_id;
$$ LANGUAGE SQL;
--============================================================================--
SELECT
  users.block_user (
    v_e_target_e_user_id := ${user.eUserID},
    v_e_session_id := ${session.id},
    v_e_user_id := ${user.id}
  );
--============================================================================--
-- 4 - Unblock user (unblock_user)
--============================================================================--
CREATE FUNCTION users.unblock_user (
  IN v_e_target_e_user_id BIGINT,
  IN v_e_session_id BIGINT,
  IN v_e_user_id BIGINT,
  OUT e_target_e_user_id BIGINT
)
AS $$
WITH upd AS (
  UPDATE
    users.e_user
  SET
    d_user_state_id = 1
  WHERE
    id = v_e_target_e_user_id
  RETURNING
    *
)
INSERT INTO
  users.f_user_operation (
    d__user_operation_type_id,
    e_session_id,
    e_user_id,
    e_target_e_user_id,
    e_person_id,
    u_username,
    u_password,
    a_user_email,
    d_user_state_id,
    is_deleted
  )
VALUES (
  4,
  v_e_session_id,
  v_e_user_id,
  (SELECT id FROM upd),
  (SELECT e_person_id FROM upd),
  (SELECT u_username FROM upd),
  'PASSWORD',
  (SELECT a_user_email FROM upd),
  (SELECT d_user_state_id FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_target_e_user_id;
$$ LANGUAGE sql;
--============================================================================--
SELECT
  users.unblock_user (
    v_e_target_e_user_id := ${user.eUserID},
    v_e_session_id := ${session.id},
    v_e_user_id := ${user.id}
  );
--============================================================================--
-- 5 - Delete user (delete_user)
--============================================================================--
CREATE FUNCTION users.delete_user (
  IN v_e_target_e_user_id BIGINT,
  IN v_e_session_id BIGINT,
  IN v_e_user_id BIGINT,
  OUT e_target_e_user_id BIGINT
)
AS $$
WITH upd AS (
  UPDATE
    users.e_user
  SET
    d_user_state_id = 3,
    is_deleted = TRUE
  WHERE
    id = v_e_target_e_user_id
  RETURNING
    *
)
INSERT INTO
  users.f_user_operation (
    d_user_operation_type_id,
    e_session_id,
    e_user_id,
    e_target_e_user_id,
    e_person_id,
    u_username,
    u_password,
    a_user_email,
    d_user_state_id,
    is_deleted
  )
VALUES (
  5,
  v_e_session_id,
  v_e_user_id,
  (SELECT id FROM upd),
  (SELECT e_person_id FROM upd),
  (SELECT u_username FROM upd),
  'PASSWORD',
  (SELECT a_user_email FROM upd),
  (SELECT d_user_state_id FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  v_e_target_e_user_id;
$$ LANGUAGE sql;
--============================================================================--
SELECT
  users.delete_user (
    v_e_target_e_user_id := {user.eUserID},
    v_e_session_id := ${session.id},
    v_e_user_id := ${user.id}
  );
--============================================================================--
-- 6 - Restore user (restore_user)
--============================================================================--
CREATE FUNCTION users.restore_user (
  IN v_e_target_e_user_id BIGINT,
  IN v_e_session_id BIGINT,
  IN v_e_user_id BIGINT,
  OUT e_target_e_user_id BIGINT
)
AS $$
WITH upd AS (
  UPDATE
    users.e_user
  SET
    d_user_state_id = 1,
    is_deleted = FALSE
  WHERE
    id = v_e_target_e_user_id
  RETURNING
    *
)
INSERT INTO
  users.f_user_operation (
    d_user_operation_type_id,
    e_session_id,
    e_user_id,
    e_target_e_user_id,
    e_person_id,
    u_username,
    u_password,
    a_user_email,
    d_user_state_id,
    is_deleted
  )
VALUES (
  6,
  v_e_session_id,
  v_e_user_id,
  (SELECT id FROM upd),
  (SELECT e_person_id FROM upd),
  (SELECT u_username FROM upd),
  'PASSWORD',
  (SELECT a_user_email FROM upd),
  (SELECT d_user_state_id FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_target_e_user_id;
$$ LANGUAGE SQL;
--============================================================================--
SELECT
  users.restore_user (
    v_e_target_e_user_id := ${user.eUserID},
    v_e_session_id := ${session.id},
    v_e_user_id := ${user.id}
  );
--============================================================================--
