CREATE TABLE sessions.e_session (
  id SERIAL,
  e_user_id INTEGER NOT NULL,
  open_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  close_timestamp TIMESTAMP WITH TIME ZONE,
  status_id INTEGER NOT NULL
    PRIMARY KEY (id),
    FOREIGN KEY (e_user_id) REFERENCES users.e_user (id),
    FOREIGN KEY (status_id) REFERENCES sessions.d_session_status (id)
);
