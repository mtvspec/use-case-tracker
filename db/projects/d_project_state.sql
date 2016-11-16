CREATE TABLE projects.d_project_state (
  id SERIAL,
  cr_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO
  projects.d_project_state (
    id
  )
VALUES
(
  1
),
(
  2
),
(
  3
),
(
  4
);

CREATE TABLE projects.tr_project_state (
  id SERIAL,
  state_en VARCHAR (1000) NOT NULL,
  state_ru VARCHAR (1000),
  state_kz VARCHAR (1000),
    cr_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
    is_deleted CHAR (1) NOT NULL DEFAULT 'N',
      PRIMARY KEY (id),
      UNIQUE (state_en),
      UNIQUE (state_ru),
      UNIQUE (state_kz),
      UNIQUE (state_en, state_ru, state_kz)
);

INSERT INTO
  projects.tr_project_state (
    state_en
  )
VALUES
(
  'Created'
),
(
  'Active'
),
(
  'Rejected'
),
(
  'Closed'
);

CREATE TABLE projects.d_project_action (
  id SERIAL,
  cr_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE projects.r_project_action (
  id SERIAL,
  action_id INTEGER NOT NULL,
  state_id INTEGER NOT NULL,
    is_deleted CHAR (1) NOT NULL DEFAULT 'N',
      PRIMARY KEY (id),
      FOREIGN KEY (action_id) REFERENCES projects.d_project_action (id),
      FOREIGN KEY (state_id) REFERENCES projects.d_project_state (id)
);

CREATE TABLE projects.tr_project_action (
  id SERIAL,
  action_en VARCHAR (1000) NOT NULL,
  action_ru VARCHAR (1000),
  action_kz VARCHAR (1000),
    cr_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
    is_deleted CHAR (1) NOT NULL DEFAULT 'N',
      PRIMARY KEY (id),
      UNIQUE (action_en),
      UNIQUE (action_ru),
      UNIQUE (action_kz),
      UNIQUE (action_en, action_ru, action_kz)
);

INSERT INTO projects.tr_project_action (
  action_en
)
VALUES
(
  'Create'
),
(
  'Open'
),
(
  'Reject'
),
(
  'Close'
);

CREATE TABLE projects.r_project_state (
  id SERIAL,
  d_project_state_id INTEGER NOT NULL,
  tr_project_state_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (d_project_state_id) REFERENCES projects.d_project_state (id),
    FOREIGN KEY (tr_project_state_id) REFERENCES projects.tr_project_state (id)
);

INSERT INTO
  projects.r_project_state (
    d_project_state_id,
    tr_project_state_id
  )
VALUES
(
  1,
  1
),
(
  2,
  2
),
(
  3,
  3
),
(
  4,
  4
);
