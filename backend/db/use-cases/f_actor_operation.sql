--============================================================================--
-- Create actor
--============================================================================--
CREATE TABLE use_cases.f_actor_operation (
  id SERIAL NOT NULL,
  e_actor_id INTEGER NOT NULL,
  d_operation_type_id INTEGER NOT NULL,
  a_operation_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  e_user_id INTEGER NOT NULL,
  a_short_name VARCHAR (100),
  a_long_name VARCHAR (1000),
  a_description VARCHAR (4000),
    PRIMARY KEY (
      e_actor_id
    ),
    UNIQUE (
      id
    ),
    FOREIGN KEY (
      e_actor_id
    ) REFERENCES use_cases.e_actor (id),
    FOREIGN KEY (
      d_operation_type_id
    ) REFERENCES use_cases.d_actor_operation (id),
    FOREIGN KEY (
      e_user_id
    ) REFERENCES users.e_user (id)
);
--------------------------------------------------------------------------------
CREATE FUNCTION use_cases.create_actor (
  IN v_a_short_name VARCHAR (100) DEFAULT NULL,
  IN v_a_long_name VARCHAR (1000) DEFAULT NULL,
  IN v_a_description VARCHAR (4000) DEFAULT NULL,
  IN v_e_user_id INTEGER DEFAULT NULL,
  OUT e_actor_id INTEGER
)
AS $$
WITH ins AS (
  INSERT INTO
    use_cases.e_actor (
      a_short_name,
      a_long_name,
      a_description
    )
  VALUES
  (
    v_a_short_name,
    v_a_long_name,
    v_a_description
  )
  RETURNING
    id
)
INSERT INTO
  use_cases.f_actor_operation (
    e_actor_id,
    d_operation_type_id,
    e_user_id,
    a_short_name,
    a_long_name,
    a_description
  )
VALUES
(
  (SELECT id FROM ins),
  1,
  v_e_user_id
)
RETURNING
  id "e_actor_id";
$$ LANGUAGE sql;
--------------------------------------------------------------------------------
