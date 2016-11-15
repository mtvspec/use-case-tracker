CREATE TABLE sessions.e_session (
  id SERIAL,
  e_user_id INTEGER NOT NULL,
  open_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  close_timestamp TIMESTAMP WITH TIME ZONE,
  status_id CHAR (1) NOT NULL DEFAULT 'O',
    PRIMARY KEY (id),
    FOREIGN KEY (e_user_id) REFERENCES users.e_user (id),
    FOREIGN KEY (status_id) REFERENCES sessions.d_session_status (id)
);

CREATE FUNCTION sessions.open_session (
  IN v_e_user_id INTEGER,
  OUT e_session_id INTEGER
)
AS $$
INSERT INTO
  sessions.e_session (
    e_user_id
  )
VALUES (
  v_e_user_id
)
RETURNING
  id "e_session_id";
$$ LANGUAGE sql;

CREATE FUNCTION sessions.close_session (
  IN v_session_id INTEGER,
  OUT e_session_id INTEGER
)
AS $$
UPDATE
  sessions.e_session
SET
  close_timestamp = CURRENT_TIMESTAMP
WHERE
  id = v_session_id
RETURNING
  id "e_session_id";
$$ LANGUAGE sql;
