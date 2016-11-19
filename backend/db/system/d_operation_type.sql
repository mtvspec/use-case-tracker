--============================================================================--
-- Operation Type (d_operation_type)
--============================================================================--
CREATE TABLE systems.d_operation_type (
  id SERIAL NOT NULL,
  operation_type_name_en VARCHAR (1000) NOT NULL,
  cr_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
    PRIMARY KEY (
      operation_type_name_en
    ),
    UNIQUE (
      id
    )
);
--------------------------------------------------------------------------------
INSERT INTO
  system.d_operation_type (
    type
  )
VALUES (
  'INSERT'
),
(
  'UPDATE'
),
(
  'DELETE'
),
(
  'RESTORE'
),
(
  'SELECT'
);
