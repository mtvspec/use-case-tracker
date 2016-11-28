--============================================================================--
-- Project operations (f_project_operation)
--============================================================================--
CREATE TABLE projects.f_project_operation (
  id BIGSERIAL,
  d_project_operation_type_id INTEGER NOT NULL,
  a_operation_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_session_id BIGINT NOT NULL,
  e_user_id BIGINT NOT NULL,
  e_project_id BIGINT NOT NULL,
  d_project_kind_id INTEGER,
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
  d_project_state_id INTEGER NOT NULL,
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (
      id
    ),
    FOREIGN KEY (
      d_project_operation_type_id
    ) REFERENCES projects.d_project_operation (id),
    FOREIGN KEY (
      e_session_id
    ) REFERENCES sessions.e_session (id),
    FOREIGN KEY (
      e_user_id
    ) REFERENCES users.e_user (id),
    FOREIGN KEY (
      e_project_id
    ) REFERENCES projects.e_project (id),
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
    ) REFERENCES projects.d_project_state (id)
);
--============================================================================--
-- Create project (create_project)
--============================================================================--
CREATE FUNCTION projects.create_project (
  IN v_d_project_kind_id INTEGER,
  IN v_e_customer_id BIGINT,
  IN v_a_project_name VARCHAR (1000),
  IN v_a_project_desc TEXT,
  IN v_e_session_id BIGINT,
  IN v_e_user_id BIGINT,
  OUT e_project_id BIGINT
)
AS $$
WITH ins AS (
  INSERT INTO
    projects.e_project (
      d_project_kind_id,
      e_customer_id,
      a_project_name,
      a_project_desc,
      d_project_state_id
    )
  VALUES (
    v_d_project_kind_id,
    v_e_customer_id,
    v_a_project_name,
    v_a_project_desc,
    1
  )
  RETURNING
    *
)
INSERT INTO
  projects.f_project_operation (
    d_project_operation_type_id,
    e_session_id,
    e_user_id,
    e_project_id,
    d_project_kind_id,
    e_customer_id,
    a_project_name,
    a_project_desc,
    d_project_state_id,
    is_deleted
  )
VALUES (
  1,
  v_e_session_id,
  v_e_user_id,
  (SELECT id FROM ins),
  (SELECT d_project_kind_id FROM ins),
  (SELECT e_customer_id FROM ins),
  (SELECT a_project_name FROM ins),
  (SELECT a_project_desc FROM ins),
  (SELECT d_project_state_id FROM ins),
  (SELECT is_deleted FROM ins)
)
RETURNING
  e_project_id;
$$ LANGUAGE sql;
--------------------------------------------------------------------------------
SELECT
  projects.create_project (
    v_d_project_kind_id := 1,
    v_e_customer_id := 1,
    v_a_project_name := 'Kanban cards',
    v_a_project_desc := 'Kanban cards for main project',
    v_e_session_id := 1,
    v_e_user_id := 1
  );
--============================================================================--
-- Start project (start_project)
--============================================================================--
CREATE FUNCTION projects.start_project (
  IN v_e_project_id BIGINT,
  IN v_d_project_kind_id INTEGER,
  IN v_e_customer_id BIGINT DEFAULT 0,
  IN v_a_project_name VARCHAR (1000),
  IN v_a_project_desc TEXT,
  IN v_e_contract_id BIGINT DEFAULT 0,
  IN v_e_project_manager_id BIGINT,
  IN v_e_project_plan_id INTEGER DEFAULT 0,
  IN v_e_project_team_id INTEGER,
  IN v_a_official_project_name VARCHAR (4000),
  IN v_a_plan_start_date DATE,
  IN v_a_plan_end_date DATE,
  IN v_a_plan_budget NUMERIC,
  IN v_a_fact_start_date DATE,
  IN v_e_session_id BIGINT,
  IN v_e_user_id BIGINT,
  OUT e_project_id BIGINT
)
AS $$
WITH upd AS (
  UPDATE
    projects.e_project
  SET
    d_project_kind_id = v_d_project_kind_id,
    e_customer_id = v_e_customer_id,
    a_project_name = v_a_project_name,
    a_project_desc = v_a_project_desc,
    e_contract_id = v_e_contract_id,
    e_project_manager_id = v_e_project_manager_id,
    e_project_plan_id = v_e_project_plan_id,
    e_project_team_id = v_e_project_team_id,
    a_official_project_name = v_a_official_project_name,
    a_plan_start_date = v_plan_start_date,
    a_plan_end_date = v_a_plan_end_date,
    a_plan_budget = v_a_plan_budget,
    a_fact_start_date = v_a_fact_start_date,
    d_project_state_id = 2
  WHERE
    id = v_e_project_id
  RETURNING
    *
)
INSERT INTO
  projects.f_project_operation (
    d_project_operation_type_id,
    e_session_id,
    e_user_id,
    e_project_id,
    d_project_kind_id,
    e_customer_id,
    a_project_name,
    a_project_desc,
    e_project_manager_id,
    a_official_project_name,
    a_plan_start_date,
    a_plan_end_date,
    a_plan_budget,
    a_fact_start_date,
    d_project_state_id
  )
VALUES (
  2,
  v_e_session_id,
  v_e_user_id,
  (SELECT id FROM upd),
  (SELECT d_project_kind_id FROM upd),
  (SELECT e_customer_id FROM upd),
  (SELECT a_project_name FROM upd),
  (SELECT a_project_desc FROM upd),
  (SELECT e_project_manager_id FROM upd),
  (SELECT a_official_project_name FROM upd),
  (SELECT a_plan_start_date FROM upd),
  (SELECT a_plan_end_date FROM upd),
  (SELECT a_plan_budget FROM upd),
  (SELECT a_fact_start_date FROM upd),
  (SELECT d_project_state_id FROM upd)
)
RETURNING
  e_project_id;
$$ LANGUAGE sql;
--------------------------------------------------------------------------------
SELECT
  projects.start_project (
    v_e_project_id := 1,
    v_d_project_kind_id := 1,
    v_e_customer_id := 1,
    v_a_project_name := 'Use case tracker',
    v_a_project_desc := 'Use case tracker...',
    v_e_project_manager_id := 1,
    v_a_official_project_name := 'Use case tracker',
    v_a_plan_start_date := '2016-12-01',
    v_a_plan_end_date := '2017-01-01',
    v_a_plan_budget := '0',
    v_a_fact_start_date := '2016-12-10',
    v_e_session_id := 1,
    v_e_user_id := 1
  );
--============================================================================--
-- Close project (close_project)
--============================================================================--
CREATE FUNCTION projects.close_project (
  IN v_e_project_id INTEGER DEFAULT NULL,
  IN v_e_contract_id INTEGER DEFAULT NULL,
  IN v_e_project_manager_id INTEGER DEFAULT NULL,
  IN v_a_fact_end_date DATE DEFAULT NULL,
  IN v_a_fact_budget NUMERIC DEFAULT NULL,
  IN v_e_user_id INTEGER DEFAULT NULL,
  OUT e_project_id INTEGER
)
AS $$
WITH upd AS (
  UPDATE
    projects.e_project
  SET
    e_contract_id = v_e_contract_id,
    e_project_manager_id = v_e_project_manager_id,
    a_fact_end_date = v_a_fact_end_date,
    a_fact_budget = v_a_fact_budget,
    d_project_state_id = 5
  WHERE
    id = v_e_project_id
  RETURNING
    *
)
INSERT INTO
  projects.f_project_operation (
    d_project_operation_type_id,
    e_user_id,
    e_project_id,
    a_project_name,
    e_contract_id,
    e_project_manager_id,
    a_fact_end_date,
    a_fact_budget,
    d_project_state_id
  )
VALUES (
  5,
  v_e_user_id,
  (SELECT id FROM upd),
  (SELECT e_contract_id FROM upd),
  (SELECT e_project_manager_id FROM upd),
  (SELECT a_fact_end_date FROM upd),
  (SELECT a_fact_budget FROM upd),
  (SELECT d_project_state_id FROM upd)
)
RETURNING
  (SELECT id FROM upd) "e_project_id";
$$ LANGUAGE sql;
-------------------------------------------------------------------------------------------
SELECT
  projects.close_project (
    v_e_project_id := 5,
    v_a_fact_end_date := '2016-11-28',
    v_a_fact_budget := '10000',
    v_e_user_id := 1
  );
-------------------------------------------------------------------------------------------
