--============================================================================--
-- Project (e_project)
--============================================================================--
CREATE TABLE projects.e_project (
  id SERIAL NOT NULL,
  d_project_kind_id INTEGER,
  e_customer_id INTEGER,
  a_project_name VARCHAR (1000) NOT NULL,
  a_project_description VARCHAR (4000),
  e_project_manager_id INTEGER,
  a_official_project_name VARCHAR (4000),
  a_plan_start_date DATE,
  a_plan_end_date DATE,
  a_plan_budget NUMERIC,
  a_fact_start_date DATE,
  a_fact_end_date DATE,
  a_fact_budget NUMERIC,
  d_project_state_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_project_name
      ),
      UNIQUE (
        id
      ),
      FOREIGN KEY (
        d_project_kind_id
      ) REFERENCES projects.d_project_kind (id),
      FOREIGN KEY (
        e_customer_id
      ) REFERENCES customers.e_customer (id),
      FOREIGN KEY (
        e_project_manager_id
      ) REFERENCES emp.e_emp (id),
      FOREIGN KEY (
        d_project_state_id
      ) REFERENCES project.d_project_state (id)
);
--------------------------------------------------------------------------------
