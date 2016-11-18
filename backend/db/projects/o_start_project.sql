--============================================================================--
-- Start project
--============================================================================--
CREATE TABLE projects.o_start_project (
  id SERIAL NOT NULL,
  d_operation_type_id INTEGER NOT NULL,
  operation_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_user_id INTEGER NOT NULL,
  e_project_id INTEGER NOT NULL,
  e_customer_id INTEGER NOT NULL,
  e_contract_id INTEGER NOT NULL,
  e_project_manager_id INTEGER NOT NULL,
  e_project_plan_id INTEGER NOT NULL,
    PRIMARY KEY (
      e_project_id,
      e_customer_id,
      e_contract_id
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
--============================================================================--
SELECT
  projects.start_project (
    v_e_user_id := 1,
    v_e_project_id := 3,
    v_e_customer_id := 1,
    v_e_project_manager_id := 1,
    v_e_project_plan_id := 1,
    v_e_contract_id := 2
  );
