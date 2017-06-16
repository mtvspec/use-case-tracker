--============================================================================--
-- Test element result (d_test_element_result)
--============================================================================--
CREATE TABLE test_cases.d_test_element_result (
  id SERIAL NOT NULL,
  a_test_element_result_name_en VARCHAR (1000) NOT NULL,
  a_test_element_result_desc_en TEXT,
  a_test_element_result_name_ru VARCHAR (1000),
  a_test_element_result_desc_ru TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
     PRIMARY KEY (
       a_test_element_result_name_en
     ),
     UNIQUE (
       id
     ),
     UNIQUE (
       a_test_element_result_name_ru
     )
);
--============================================================================--
INSERT INTO
  test_cases.d_test_element_result (
    a_test_element_result_name_en
  )
VALUES
(
  'Not tested'
),
(
  'Test passed'
),
(
  'Test not passed'
);
