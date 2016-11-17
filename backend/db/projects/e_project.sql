CREATE TABLE projects.e_project (
  id SERIAL,
  customer_id INTEGER,
  short_name VARCHAR (3),
  work_name VARCHAR (1000) NOT NULL,
  official_name VARCHAR (4000),
  description VARCHAR (4000),
  plan_start_date DATE,
  plan_end_date DATE,
  plan_budget NUMERIC,
  fact_start_date DATE,
  fact_end_date DATE,
  fact_budget NUMERIC,
  project_manager_id INTEGER,
  state_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      UNIQUE (
        short_name
      ),
      UNIQUE (
        work_name
      ),
      UNIQUE (
        official_name
      ),
      UNIQUE (
        description
      ),
      FOREIGN KEY (
        customer_id
      ) REFERENCES customers.e_customer (id),
      FOREIGN KEY (
        project_manager_id
      ) REFERENCES persons.e_person (id),
      FOREIGN KEY (
        state_id
      ) REFERENCES projects.d_project_state (id)
);

CREATE TABLE projects.e_project (
  id SERIAL NOT NULL,
  e_customer_id INTEGER,
  a_project_name VARCHAR (1000) NOT NULL,
  a_project_description VARCHAR (4000),
  a_official_project_name VARCHAR (4000),
  a_plan_start_date DATE,
  a_plan_end_date DATE,
  a_plan_budget NUMERIC,
  a_fact_start_date DATE,
  a_fact_end_date DATE,
  a_fact_budget NUMERIC,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_project_name,
        a_project_description
      ),
      UNIQUE (
        id
      ),
      FOREIGN KEY (
        e_customer_id
      ) REFERENCES customers.e_customer (id)
);

CREATE TABLE projects.e_project_log (
  id SERIAL,
  d_operation_type_id INTEGER NOT NULL,
  operation_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_project_id INTEGER NOT NULL,
  e_customer_id INTEGER,
  a_name VARCHAR (1000) NOT NULL,
  a_description VARCHAR (4000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    e_user_id INTEGER NOT NULL,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        d_operation_type_id
      ) REFERENCES system.d_operation_type (id),
      FOREIGN KEY (
        e_project_id
      ) REFERENCES projects.e_project (id),
      FOREIGN KEY (
        e_customer_id
      ) REFERENCES customers.e_customer (id),
      FOREIGN KEY (
        e_user_id
      ) REFERENCES users.e_user (id)
);

CREATE TABLE projects.o_create_project (
  id SERIAL,
  d_operation_type_id INTEGER NOT NULL,
  a_operation_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  e_user_id INTEGER NOT NULL,
  e_project_id INTEGER NOT NULL,
    PRIMARY KEY (
      id
    ),
    UNIQUE (
      e_project_id
    ),
    FOREIGN KEY (
      d_operation_type_id
    ) REFERENCES projects.e_project_operation (id),
    FOREIGN KEY (
      e_user_id
    ) REFERENCES users.e_user (id),
    FOREIGN KEY (
      e_project_id
    ) REFERENCES projects.e_project (id)
);
--============================================================================--
-- Create project
--============================================================================--
CREATE FUNCTION projects.create_project (
  IN v_e_customer_id INTEGER DEFAULT NULL,
  IN v_a_project_name VARCHAR (1000) DEFAULT NULL,
  IN v_a_project_description VARCHAR (4000) DEFAULT NULL,
  IN v_e_user_id INTEGER DEFAULT NULL,
  OUT v_e_project_id INTEGER
)
AS $$
WITH ins AS (
  INSERT INTO
    projects.e_project (
      e_customer_id,
      a_project_name,
      a_project_description
    )
  VALUES
  (
    v_e_customer_id,
    v_a_project_name,
    v_a_project_description
  )
  RETURNING
    id
  )
INSERT INTO
  projects.o_create_project (
    d_operation_type_id,
    e_user_id,
    e_project_id
  )
VALUES
(
  1,
  v_e_user_id,
  (SELECT id FROM ins)
)
RETURNING
  (SELECT id FROM ins) "e_project_id";
$$ LANGUAGE sql;

SELECT
  projects.create_project (
    v_a_project_name := 'New project',
    v_a_project_description := 'New project is...',
    v_e_user_id := 1
  );
--============================================================================--
-- Start project
--============================================================================--
CREATE TABLE projects.o_start_project (
  id SERIAL NOT NULL,
  d_operation_type_id INTEGER NOT NULL,
  e_user_id INTEGER NOT NULL,
  e_project_id INTEGER NOT NULL,
  e_customer_id INTEGER NOT NULL,
  e_contract_id INTEGER,
  e_project_manager_id INTEGER NOT NULL,
  e_project_plan_id INTEGER NOT NULL,
    PRIMARY KEY (
      e_project_id,
      e_customer_id,
      e_project_manager_id
    ),
    UNIQUE (
      id
    ),
    FOREIGN KEY (
      e_project_id
    ) REFERENCES projects.e_project (id),
    FOREIGN KEY (
      e_customer_id
    ) REFERENCES customers.e_customer (id),
    FOREIGN KEY (
      e_contract_id -- TODO: checking for contract
    ) REFERENCES documents.e_document (id),
    FOREIGN KEY (
      e_project_manager_id
    ) REFERENCES emp.e_emp (id),
    FOREIGN KEY (
      e_project_plan_id -- TODO: check for plan
    ) REFERENCES documents.e_document (id)
);
--------------------------------------------------------------------------------
CREATE FUNCTION projects.start_project (
  IN v_e_project_id INTEGER DEFAULT NULL,
  IN v_e_customer_id INTEGER DEFAULT NULL,
  IN v_e_contract_id INTEGER DEFAULT NULL,
  IN v_e_project_manager_id INTEGER DEFAULT NULL,
  IN v_e_project_plan_id INTEGER DEFAULT NULL,
  IN v_a_official_project_name VARCHAR (4000) DEFAULT NULL,
  IN v_a_plan_start_date DATE DEFAULT NULL,
  IN v_a_plan_end_date DATE DEFAULT NULL,
  IN v_a_plan_budget NUMERIC DEFAULT NULL,
  IN v_e_user_id INTEGER DEFAULT NULL,
  OUT v_operation_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    projects.e_project
  SET
    a_official_project_name = v_a_official_project_name,
    a_plan_start_date = v_a_plan_start_date,
    a_plan_end_date = v_a_plan_end_date,
    a_plan_budget = v_a_plan_budget
  WHERE
    id = v_e_project_id
  RETURNING
    id,
    a_official_project_name,
    a_plan_start_date,
    a_plan_end_date,
    a_plan_budget
)
INSERT INTO
  projects.o_start_project (
    d_operation_type_id,
    e_user_id,
    e_project_id,
    e_customer_id,
    e_contract_id,
    e_project_manager_id,
    e_project_plan_id
  )
VALUES
(
  2,
  v_e_user_id,
  (SELECT id FROM upd),
  v_e_customer_id,
  v_e_contract_id,
  v_e_project_manager_id,
  v_e_project_plan_id
)
RETURNING
  id "v_operation_id";
$$ LANGUAGE sql;

SELECT
  projects.start_project (
    v_e_user_id := 1,
    v_e_project_id := 3,
    v_e_customer_id := 1,
    v_e_project_manager_id := 1,
    v_e_project_plan_id := 1,
    v_e_contract_id := 2
  );

CREATE VIEW projects.v_project_operations
AS
SELECT
  p.id "Код",
  p.a_project_name "Проект",
  o.operation_en "Операция",
  pn.first_name ||' '|| pn.last_name "Пользователь",
  cr.a_operation_timestamp "Штамп времени"
FROM
  projects.e_project p,
  projects.e_project_operation o,
  persons.e_person pn,
  users.e_user u,
  projects.o_create_project cr,
  projects.o_start_project st
WHERE
  cr.e_project_id = p.id
AND
  cr.d_operation_type_id = o.id
AND
  cr.e_user_id = u.id
AND
  u.e_person_id = pn.id
AND
  st.e_project_id = p.id
AND
  st.d_operation_type_id = o.id
AND
  st.e_user_id = u.id
ORDER BY
  p.id
ASC;

CREATE TABLE projects.e_project_state (
  id SERIAL,
  e_project_id INTEGER NOT NULL,
  d_project_state_id INTEGER NOT NULL,
  e_user_id INTEGER NOT NULL,
  state_change_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      e_project_id
    ) REFERENCES projects.e_project (id),
    FOREIGN KEY (
      d_project_state_id
    ) REFERENCES projects.d_project_state (id),
    FOREIGN KEY (
      e_user_id
    ) REFERENCES users.e_user (id)
);

CREATE TABLE projects.e_project_log (
  id SERIAL,
  d_operation_type_id INTEGER NOT NULL,
  operation_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
  e_project_id INTEGER NOT NULL,
  customer_id INTEGER,
  short_name VARCHAR (1000) NOT NULL,
  official_name VARCHAR (4000),
  description VARCHAR (4000),
  plan_start_date DATE,
  plan_end_date DATE,
  plan_budget NUMERIC,
  fact_start_date DATE,
  fact_end_date DATE,
  fact_budget NUMERIC,
  project_manager_id INTEGER,
  state_id INTEGER NOT NULL,
    is_deleted CHAR (1) NOT NULL,
      e_user_id INTEGER NOT NULL,
        PRIMARY KEY (id)
        FOREIGN KEY (d_operation_type_id) REFERENCES system.d_operation_type (id),
        FOREIGN KEY (e_project_id) REFERENCES projects.e_project (id),
        FOREIGN KEY (e_user_id) REFERENCES users.e_user (id)
        FOREIGN KEY (customer_id) REFERENCES organizations.e_organizations (id),
        FOREIGN KEY (project_manager_id) REFERENCES persons.e_person (id),
        FOREIGN KEY (state_id) REFERENCES projects.d_state (id),
        FOREIGN KEY (is_deleted) REFERENCES system.is_deleted (id)
);

CREATE FUNCTION projects.create_project (
  IN v_customer_id INTEGER,
  IN v_short_name VARCHAR (1000),
  IN v_official_name VARCHAR (4000),
  IN v_description VARCHAR (4000),
  IN v_plan_start_date DATE,
  IN v_plan_end_date DATE,
  IN v_plan_budget NUMERIC,
  IN v_fact_start_date DATE,
  IN v_fact_end_date DATE,
  IN v_fact_budget NUMERIC,
  IN v_project_manager_id INTEGER,
  IN v_user_id INTEGER,
  OUT e_project_id INTEGER
)
AS $$
WITH ins AS (
  INSERT INTO
    projects.e_project (
      customer_id,
      short_name,
      official_name,
      description,
      plan_start_date,
      plan_end_date,
      plan_budget,
      project_manager_id
    )
  VALUES (
    v_customer_id,
    v_short_name,
    v_official_name,
    v_description,
    v_plan_start_date,
    v_plan_end_date,
    v_plan_budget,
    v_project_manager_id
  )
  RETURNING
    *
  )
INSERT INTO
  projects.e_project_log (
    d_operation_type_id,
    user_id,
    e_project_id,
    customer_id,
    short_name,
    official_name,
    description,
    plan_start_date,
    plan_end_date,
    plan_budget,
    fact_start_date,
    fact_end_date,
    fact_budget,
    project_manager_id,
    state_id,
    is_deleted
  )
VALUES
  (
    1,
    v_user_id,
    (SELECT id FROM ins),
    (SELECT customer_id FROM ins),
    (SELECT short_name FROM ins),
    (SELECT official_name FROM ins),
    (SELECT description FROM ins),
    (SELECT plan_start_date FROM ins),
    (SELECT plan_end_date FROM ins),
    (SELECT plan_budget FROM ins),
    (SELECT fact_start_date FROM ins),
    (SELECT fact_end_date FROM ins),
    (SELECT fact_budget FROM ins),
    (SELECT project_manager_id FROM ins),
    (SELECT state_id FROM ins),
    (SELECT is_deleted FROM ins)
  )
RETURNING
  e_project_id;
$$ LANGUAGE sql;

CREATE FUNCTION projects.update_project (
  IN v_user_id INTEGER,
  IN v_project_id INTEGER,
  IN v_customer_id INTEGER,
  IN v_short_name VARCHAR (1000),
  IN v_official_name VARCHAR (4000),
  IN v_description VARCHAR (4000),
  IN v_plan_start_date DATE,
  IN v_plan_end_date DATE,
  IN v_plan_budget NUMERIC,
  IN v_fact_start_date DATE,
  IN v_fact_end_date DATE,
  IN v_fact_budget NUMERIC,
  IN v_project_manager_id INTEGER,
  IN v_state_id INTEGER,
  OUT e_project_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    projects.e_project
  SET
    customer_id = v_customer_id,
    short_name = v_short_name,
    official_name = v_official_name,
    description = v_description,
    plan_start_date = v_plan_start_date,
    plan_end_date = v_plan_end_date,
    plan_budget = v_plan_budget,
    fact_start_date = v_fact_start_date,
    fact_end_date = v_fact_end_date,
    fact_budget = v_fact_budget,
    project_manager_id = v_project_manager_id,
    state_id = v_state_id
  WHERE
    id = v_project_id
  RETURNING
    *
)
INSERT INTO
  projects.e_project_log (
    d_operation_type_id,
    user_id,
    e_project_id,
    customer_id,
    short_name,
    official_name,
    description,
    plan_start_date,
    plan_end_date,
    plan_budget,
    fact_start_date,
    fact_end_date,
    fact_budget,
    project_manager_id,
    state_id,
    is_deleted
  )
VALUES (
  2,
  v_user_id,
  (SELECT id FROM upd),
  (SELECT customer_id FROM upd),
  (SELECT short_name FROM upd),
  (SELECT official_name FROM upd),
  (SELECT description FROM upd),
  (SELECT plan_start_date FROM upd),
  (SELECT plan_end_date FROM upd),
  (SELECT fact_start_date FROM upd),
  (SELECT fact_end_date FROM upd),
  (SELECT fact_budget FROM upd),
  (SELECT project_manager_id FROM upd),
  (SELECT state_id FROM upd),
  (SELECT is_deleted FROM upd)
)
RETURNING
  e_project_id;
$$ LANGUAGE sql;
