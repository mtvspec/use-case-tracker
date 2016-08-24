CREATE TABLE projects.e_project (
  id SERIAL,
  customer_id INTEGER,
  name VARCHAR (1000) NOT NULL,
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
    is_deleted CHAR (1) NOT NULL DEFAULT 'F',
      PRIMARY KEY (id),
      UNIQUE (name),
      UNIQUE (description),
      FOREIGN KEY (cr_user) REFERENCES users.e_user (id),
      FOREIGN KEY (customer_id) REFERENCES customers.e_customer (id),
      FOREIGN KEY (project_manager_id) REFERENCES persons.e_person (id),
      FOREIGN KEY (state_id) REFERENCES projects.d_state (id)
);

CREATE TABLE projects.e_project_log (
  id SERIAL,
  d_operation_type_id INTEGER NOT NULL,
  operation_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
  e_project_id INTEGER NOT NULL,
  customer_id INTEGER,
  name VARCHAR (1000) NOT NULL,
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
  IN v_name VARCHAR (1000),
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
      name,
      official_name,
      description,
      plan_start_date,
      plan_end_date,
      plan_budget,
      project_manager_id
    )
  VALUES (
    v_customer_id,
    v_name,
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
    name,
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
    (SELECT name FROM ins),
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
