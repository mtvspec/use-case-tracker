--============================================================================--
-- Test case
--============================================================================--
CREATE TABLE test_cases.e_test_case (
  id BIGSERIAL,
  a_test_case_name VARCHAR (1000) NOT NULL,
  a_test_case_desc TEXT,
    PRIMARY KEY (
      id
    )
);
--============================================================================--