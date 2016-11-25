CREATE TABLE sessions.d_session_state (
  id CHAR (1) NOT NULL,
  a_session_status_name_en VARCHAR (100) NOT NULL,
  a_session_status_desc_en TEXT,
  a_session_status_name_ru VARCHAR (100),
  a_session_status_desc_ru TEXT,
    PRIMARY KEY (
      a_session_status_name_en
    ),
    UNIQUE (
      id
    )
);

INSERT INTO
  sessions.d_session_status (
    id,
    status
  )
VALUES
(
  'O',
  'Opened'
),
(
  'C',
  'Closed'
);
