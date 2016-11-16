CREATE TABLE projects.e_project_operation (
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
      ) REFERENCES projects.e_project_operation (id),
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
      ) REFERENCES projects.e_project_operation (id),
      FOREIGN KEY (
        d_project_state_id
      ) REFERENCES projects.e_project_state (id)
);

CREATE TABLE projects.e_project_start (
  id SERIAL,
  e_project_operation_id INTEGER NOT NULL,
  e_customer_id INTEGER NOT NULL,
  e_project_manager_id NOT NULL,
  e_contract_id NOT NULL,
  e_project_plan_id NOT NULL,
  plan_start_date DATE NOT NULL,
  plan_end_date DATE NOT NULL,
  plan_budget NUMERIC NOT NULL,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      e_project_operation_id
    ) REFERENCES projects.e_project_operation (id),
    FOREIGN KEY (
      e_customer_id
    ) REFERENCES customers.e_customer (id),
    FOREIGN KEY (
      e_project_manager_id
    ) REFERENCES emp.e_emp (id),
    FOREIGN KEY (
      e_contract_id
    ) REFERENCES documents.e_document (id),
    FOREIGN KEY (
      e_project_plan_id
    ) REFERENCES documents.e_document (id)
);

CREATE TABLE projects.e_project_close (
  id SERIAL,
  e_project_operation_id INTEGER NOT NULL,
  e_project_manager_id INTEGER NOT NULL,
  e_contract_id INTEGER NOT NULL,
  e_project_plan_id INTEGER NOT NULL,
  fact_start_date DATE NOT NULL,
  fact_end_date DATE NOT NULL,
  fact_budget DATE NOT NULL,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      e_project_operation_id
    ) REFERENCES projects.e_project_operation (id),
    FOREIGN KEY (
      e_project_manager_id
    ) REFERENCES emp.e_emp (id),
    FOREIGN KEY (
      e_contract_id
    ) REFERENCES documents.e_document (id),
    FOREIGN KEY (
      e_project_plan_id
    ) REFERENCES documents.e_document (id)
);
