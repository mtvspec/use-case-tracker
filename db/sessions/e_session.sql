--============================================================================--
-- Session (e_session)
--============================================================================--
CREATE TABLE sessions.e_session (
  id BIGSERIAL,
  e_user_id BIGINT NOT NULL,
  a_token VARCHAR (4000) NOT NULL,
  a_open_timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  a_close_timestamp TIMESTAMPTZ,
  d_session_state_id CHAR (1) NOT NULL DEFAULT 'O',
    PRIMARY KEY (
      id
    ),
    UNIQUE (
      a_token
    ),
    FOREIGN KEY (
      e_user_id
    ) REFERENCES users.e_user (id)
);
--============================================================================--
-- Open session (open_session)
--============================================================================--
CREATE OR REPLACE FUNCTION sessions.open_session (
  IN v_e_user_id BIGINT,
  IN v_a_token VARCHAR (4000),
  OUT e_session_id BIGINT
)
AS $$
INSERT INTO
  sessions.e_session (
    e_user_id,
    a_token
  )
VALUES (
  v_e_user_id,
  v_a_token
)
RETURNING
  id "e_session_id";
$$ LANGUAGE sql;
--============================================================================--
-- Close session (close_session)
--============================================================================--
CREATE OR REPLACE FUNCTION sessions.close_session (
  IN v_a_token VARCHAR,
  OUT e_session_id BIGINT
)
AS $$
UPDATE
  sessions.e_session
SET
  a_close_timestamp = CURRENT_TIMESTAMP,
  d_session_state_id = 'C'
WHERE
  a_token = v_a_token
RETURNING
  id "e_session_id";
$$ LANGUAGE sql;
--============================================================================--
