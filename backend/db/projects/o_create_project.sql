--============================================================================--
-- Create project
--============================================================================--
CREATE TABLE projects.o_create_project (
  id SERIAL NOT NULL,
  d_operation_type_id INTEGER NOT NULL,
  a_operation_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  e_user_id INTEGER NOT NULL,
  e_project_id INTEGER NOT NULL,
    PRIMARY KEY (
      e_project_id
    ),
    UNIQUE (
      id
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
--------------------------------------------------------------------------------
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
