CREATE TABLE sessions.d_session_status (
  id CHAR (1) NOT NULL,
  status VARCHAR (100) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (status)
);
