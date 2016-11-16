CREATE TABLE projects.d_project_operation (
  id SERIAL,
  cr_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (
      id
    )
);

CREATE TABLE projects.tr_project_operation (
  id SERIAL,
  operation_en VARCHAR (1000) NOT NULL,
  operation_ru VARCHAR (1000),
  operation_kz VARCHAR (1000),
    cr_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      UNIQUE (
        operation_en
      ),
      UNIQUE (
        operation_ru
      ),
      UNIQUE (
        operation_kz
      ),
      UNIQUE (
        operation_en,
        operation_ru,
        operation_kz
      )
);

INSERT INTO
  projects.tr_project_state (
    state_en
  )
VALUES
(
  'Create'
),
(
  'Start'
),
(
  'Suspend'
),
(
  'Renew'
),
(
  'Close'
),
(
  'Archieve'
),
(
  'Reject'
),
(
  'Delete'
);

CREATE TABLE projects.r_project_operation (
  id SERIAL,
  d_project_operation_id INTEGER NOT NULL,
  tr_project_operation_id INTEGER NOT NULL,
    cr_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        d_project_operation_id
      ) REFERENCES projects.d_project_operation (id),
      FOREIGN KEY (
        tr_project_operation_id
      ) REFERENCES projects.tr_project_operation (id),
      UNIQUE (
        d_project_operation_id,
        tr_project_operation_id
      )
);

CREATE TABLE projects.r_project_operation_state (
  id SERIAL,
  d_project_operation_id INTEGER NOT NULL,
  d_project_state_id INTEGER NOT NULL,
    cr_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        d_project_operation_id
      ) REFERENCES projects.d_project_operation (id),
      FOREIGN KEY (
        d_project_state_id
      ) REFERENCES projects.d_project_state (id)
);
