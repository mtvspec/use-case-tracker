--============================================================================--
-- Emp operation (d_emp_operation)
--============================================================================--
CREATE TABLE emp.d_emp_operation (
  id SERIAL NOT NULL,
  a_emp_operation_name_en VARCHAR (1000) NOT NULL,
  a_emp_operation_desc_en TEXT,
  a_emp_operation_name_ru VARCHAR (1000),
  a_emp_operation_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_emp_operation_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_emp_operation_name_ru
      )
);
--============================================================================--
INSERT INTO
  emp.d_emp_operation (
    a_emp_operation_name_en
  )
VALUES
(
  'Create emp'
);
--============================================================================--
