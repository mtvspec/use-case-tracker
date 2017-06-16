CREATE TABLE log.error_log (
  id BIGSERIAL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_session_id BIGINT NOT NULL,
  err_message TEXT NOT NULL,
  err_stack JSON NOT NULL,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      e_session_id
    ) REFERENCES sessions.e_session (id)
);