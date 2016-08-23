CREATE TABLE projects.e_project (
  id SERIAL,
  customer_id INTEGER,
  name VARCHAR (1000) NOT NULL,
  description VARCHAR (4000),
  project_manager_id INTEGER,
  state_id INTEGER NOT NULL,
    is_deleted CHAR(1) NOT NULL DEFAULT 'F'
    PRIMARY KEY (id),
    UNIQUE (name),
    UNIQUE (description),
    FOREIGN KEY (cr_user) REFERENCES users.e_user (id),
    FOREIGN KEY (customer_id) REFERENCES organizations.e_organization (id),
    FOREIGN KEY (project_manager_id) REFERENCES persons.e_person (id),
    FOREIGN KEY (state_id) REFERENCES projects.d_state (id)
);

CREATE TABLE projects.e_project (
  id SERIAL,
  d_operation_type_id INTEGER NOT NULL,
  e_project_id INTEGER NOT NULL,
  customer_id INTEGER,
  name VARCHAR (1000) NOT NULL,
  description VARCHAR (4000),
  project_manager_id INTEGER,
  state_id INTEGER NOT NULL,
    is_deleted CHAR(1) NOT NULL,
    operation_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
    e_user_id INTEGER NOT NULL,
    PRIMARY KEY (id)
    FOREIGN KEY (d_operation_type_id) REFERENCES system.d_operation_type (id),
    FOREIGN KEY (e_user_id) REFERENCES users.e_user (id)
    FOREIGN KEY (customer_id) REFERENCES organizations.e_organizations (id),
    FOREIGN KEY (project_manager_id) REFERENCES persons.e_person (id),
    FOREIGN KEY (state_id) REFERENCES projects.d_state (id)
);

CREATE FUNCTION create_project (
  IN $customer_id INTEGER,
  IN $name VARCHAR(1000),
  IN $description VARCHAR(4000),
  IN $project_manager_id INTEGER,
  IN $state_id INTEGER,
  IN $user_id INTEGER,
  OUT $project_id INTEGER)
  AS $$
  WITH ins AS (
    INSERT INTO
      projects.e_project (
        customer_id,
        name,
        description,
        project_manager_id,
        state_id,
        user_id
      )
    VALUES (
      $customer_id,
      $name,
      $description,
      $project_manager_id,
      $state_id,
      $user_id
    )
    RETURNING
      *
    )
    WITH log AS (
    INSERT INTO
      projects.e_project_log (
        operation_id,
        customer_id,
        name,
        description,
        project_manager_id,
        state_id,
        user_id
      )
    VALUES
      (
        1
      )
    RETURNING
      id
    )
    UPDATE
      projects.e_project_log
    SET
      customer_id = (
        SELECT
          customer_id
        FROM
          ins;
      ),
      name = (
        SELECT
          name
        FROM
          ins;
      ),
      description = (
        SELECT
          description
        FROM
          ins;
      ),
      project_manager_id = (
        SELECT
          project_manager_id
        FROM
          ins;
      ),
      state_id = (
        SELECT
          state_id
        FROM
          ins;
      ),
      user_id = (
        SELECT
          user_id
        FROM
          ins;
      )
    WHERE
      id = (
        SELECT
          id
        FROM
          ins;
      )
    SELECT
      id "$project_id"
    FROM
      ins;
  $$
  LANGUAGE sql;
