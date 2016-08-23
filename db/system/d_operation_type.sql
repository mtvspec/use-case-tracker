CREATE TABLE system.d_operation_type (
  id SERIAL,
  type VARCHAR (1000) NOT NULL,
  cr_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE (type)
);

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
