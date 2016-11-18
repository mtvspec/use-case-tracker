--============================================================================--
-- Actor operations (d_actor_operation)
--============================================================================--
CREATE TABLE use_cases.d_actor_operation (
  id SERIAL NOT NULL,
  a_operation_name_en VARCHAR (1000) NOT NULL,
  a_operation_name_ru VARCHAR (1000),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_operation_name_en
      ),
      UNIQUE (
        id
      )
);
--------------------------------------------------------------------------------
INSERT INTO
  use_cases.d_actor_operation (
    a_operation_name_en
  )
VALUES
(
  'Create actor'
),
(
  'Update actor'
),
(
  'Delete actor'
),
(
  'Restore actor'
);
--============================================================================--
