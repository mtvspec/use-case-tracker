--============================================================================--
-- Project log (e_project_log)
--============================================================================--
CREATE TABLE log.e_project_log (
  id BIGSERIAL,
  e_operation_id BIGINT NOT NULL,
  e_project_id BIGINT NOT NULL,
  d_project_kind_id BIGINT,
  e_customer_id BIGINT,
  a_project_name VARCHAR (1000),
  a_project_desc TEXT,
  e_contract_id BIGINT,
  e_project_manager_id BIGINT,
  e_project_plan_id BIGINT,
  e_project_team_id BIGINT,
  a_official_project_name VARCHAR (4000),
  a_plan_start_date DATE,
  a_plan_end_date DATE,
  a_plan_budget NUMERIC,
  a_fact_start_date DATE,
  a_fact_end_date DATE,
  a_fact_budget NUMERIC,
  d_project_state_id BIGINT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_operation_id
      ) REFERENCES operations.e_operation (id),
      FOREIGN KEY (
        e_project_id
      ) REFERENCES projects.e_project (id),
      FOREIGN KEY (
        d_project_kind_id
      ) REFERENCES dict.e_dict_value (id),
      FOREIGN KEY (
        e_customer_id
      ) REFERENCES customers.e_customer (id),
      FOREIGN KEY (
        e_contract_id
      ) REFERENCES documents.e_document (id),
      FOREIGN KEY (
        e_project_manager_id
      ) REFERENCES emp.e_emp (id),
      FOREIGN KEY (
        e_project_plan_id
      ) REFERENCES documents.e_document (id),
      FOREIGN KEY (
        e_project_team_id
      ) REFERENCES projects.e_project_team (id),
      FOREIGN KEY (
        d_project_state_id
      ) REFERENCES dict.e_dict_value (id)
);
--============================================================================--