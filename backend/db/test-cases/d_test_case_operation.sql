--============================================================================--
-- Test case operation (d_test_case_operation)
--============================================================================--
CREATE TABLE test_cases.d_test_case_operation (
  id SERIAL NOT NULL,
  a_test_case_operation_name_en VARCHAR (1000) NOT NULL,
  a_test_case_operation_desc_en TEXT,
  a_test_case_operation_name_ru VARCHAR (1000) NOT NULL,
  a_test_case_operation_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        a_test_case_operation_name_en
      ),
      UNIQUE (
        id
      ),
      UNIQUE (
        a_test_case_operation_name_ru
      )
);
--============================================================================--
