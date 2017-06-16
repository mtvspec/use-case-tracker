--============================================================================--
-- Statement operation (d_statement_operation)
--============================================================================--
CREATE TABLE statements.d_statement_operation (
  id SERIAL NOT NULL,
  a_statement_operation_name_en VARCHAR (1000) NOT NULL,
  a_statement_operation_desc_en TEXT,
  a_statement_operation_name_ru VARCHAR (1000),
  a_statement_operation_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_statement_operation_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_statement_operation_name_ru
      )
);
--============================================================================--
INSERT INTO
  statements.d_statement_operation (
    a_statement_operation_name_en,
  )
VALUES
(
  'Create statement'
),
(
  'Update statement'
),
(
  'Delete statement'
),
(
  'Restore statement'
);
--============================================================================--
