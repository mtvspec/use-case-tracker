--============================================================================--
-- Use case (e_use_case)
--============================================================================--
CREATE TABLE use_cases.e_use_case (
  id BIGSERIAL,
  e_use_case_subject_id INTEGER NOT NULL,
  e_component_id INTEGER NOT NULL,
  e_primary_actor_id INTEGER NOT NULL,
  a_use_case_name VARCHAR (1000) NOT NULL,
  a_use_case_desc TEXT,
  d_use_case_level_id INTEGER NOT NULL DEFAULT 1,
  d_use_case_type_id INTEGER NOT NULL DEFAULT 2,
  d_use_case_state_id INTEGER NOT NULL DEFAULT 1,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        e_use_case_subject_id,
        e_component_id,
        e_primary_actor_id,
        a_use_case_name
      ),
      UNIQUE (
        e_use_case_id
      ),
      FOREIGN KEY (
        e_use_case_subject_id
      ) REFERENCES use_cases.e_use_case_subject (id),
      FOREIGN KEY (
        e_component_id
      ) REFERENCES components.e_component (id),
      FOREIGN KEY (
        e_primary_actor_id
      ) REFERENCES use_cases.e_actor (id),
      FOREIGN KEY (
        d_use_case_level_id
      ) REFERENCES use_cases.d_use_case_level (id),
      FOREIGN KEY (
        d_use_case_type_id
      ) REFERENCES use_cases.d_use_case_type (id)
);
--============================================================================--
CREATE TABLE use_cases.e_use_case_log (
  id SERIAL,
  d_operation_type_id INTEGER NOT NULL,
  operation_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER NOT NULL,
  e_component_id INTEGER NOT NULL,
  e_actor_id INTEGER NOT NULL,
  a_name VARCHAR (1000) NOT NULL,
  a_description VARCHAR (4000),
  d_use_case_decision_id INTEGER,
  d_use_case_type_id INTEGER NOT NULL,
  d_use_case_level_id INTEGER NOT NULL
    is_deleted BOOLEAN NOT NULL,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        d_operation_type_id
      ) REFERENCES system.d_operation_type (id),
      FOREIGN KEY (
        user_id
      ) REFERENCES users.e_user (id),
      FOREIGN KEY (
        e_component_id
      ) REFERENCES use_cases.e_component (id),
      FOREIGN KEY (
        e_actor_id
      ) REFERENCES use_cases.e_actor (id),
      FOREIGN KEY (
        d_use_case_level_id
      ) REFERENCES use_cases.d_use_case_level (id),
      FOREIGN KEY (
        d_use_case_type_id
      ) REFERENCES use_cases.d_use_case_type (id),
      FOREIGN KEY (
        e_use_case_version_id
      ) REFERENCES use_cases.e_use_case_version (id)
);

CREATE FUNCTION use_cases.create_use_case (
  IN v_e_component_id INTEGER,
  IN v_e_actor_id INTEGER,
  IN v_a_description VARCHAR (4000),
  IN v_d_use_case_type_id INTEGER,
  IN v_d_use_case_level_id INTEGER,
  IN v_user INTEGER,
  OUT e_use_case_id INTEGER
)
AS $$
WITH ins AS (
  INSERT INTO
    use_cases.e_use_case (
      e_component_id,
      e_actor_id,
      a_description,
      d_use_case_type_id,
      d_use_case_level_id
    )
  VALUES (
    v_e_component_id,
    v_e_actor_id,
    v_a_description,
    d_use_case_type_id,
    d_use_case_level_id
  )
  RETURNING
    *
)
INSERT INTO
  use_cases.e_use_case_log (
    d_operation_type_id,
    user_id,
    e_use_case_id,
    e_component_id,
    e_actor_id,
    a_description,
    d_use_case_type_id,
    d_use_case_level_id,
    is_deleted
  )
VALUES (
  1,
  v_user,
  (SELECT id FROM ins),
  (SELECT e_component_id FROM ins),
  (SELECT e_actor_id FROM ins),
  (SELECT a_description FROM ins),
  (SELECT d_use_case_type_id FROM ins),
  (SELECT d_use_case_level_id FROM ins),
  (SELECT is_deleted FROM ins)
)
RETURNING
  e_use_case_id;
$$ LANGUAGE sql;
