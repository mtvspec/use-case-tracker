CREATE TABLE projects.d_project_state (
  id SERIAL,
  cr_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO
  projects.d_state (
    state
  )
VALUES
(
  DEFAULT
),
(
  DEFAULT
);

CREATE TABLE projects.tr_project_state (
  id SERIAL,
  state_en VARCHAR (1000) NOT NULL,
  state_ru VARCHAR (1000),
  state_kz VARCHAR (1000),
    cr_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
    is_deleted CHAR (1),
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
  'Active'
),
(
  'Closed'
);

CREATE TABLE projects.r_project_state (
  id SERIAL,
  d_project_state_id INTEGER NOT NULL,
  tr_project_state_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (d_project_state_id) REFERENCES projects.d_project_state (id),
    FOREIGN KEY (tr_project_state_id) REFERENCES projects.tr_project_state (id),
    UNIQUE (d_project_state_id),
    UNIQUE (tr_project_state_id),
    UNIQUE (d_project_state_id, tr_project_state_id)
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
);