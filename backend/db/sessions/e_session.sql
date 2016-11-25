CREATE TABLE sessions.e_session (
  id SERIAL,
  e_user_id INTEGER NOT NULL,
  session VARCHAR (4000),
  open_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  close_timestamp TIMESTAMP WITH TIME ZONE,
  d_session_state_id CHAR (1) NOT NULL DEFAULT 'O',
    PRIMARY KEY (
      id
    ),
    UNIQUE (
      token
    ),
    FOREIGN KEY (
      e_user_id
    ) REFERENCES users.e_user (id),
    FOREIGN KEY (
      e_session_state_id
    ) REFERENCES sessions.d_session_state (id)
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
  close_timestamp = CURRENT_TIMESTAMP,
  status_id = 'C'
WHERE
  id = v_session_id
RETURNING
  id "e_session_id";
$$ LANGUAGE sql;
