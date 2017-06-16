--============================================================================--
-- Test element result (e_test_element_result)
--============================================================================--
CREATE TABLE test_cases.e_test_element_result (
  id BIGSERIAL,
  e_test_case_id BIGINT NOT NULL,
  e_test_element_id BIGINT NOT NULL,
  d_test_element_result_id INTEGER NOT NULL DEFAULT 1,
  a_test_element_result_comment TEXT,
   is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (
        id
      ),
      FOREIGN KEY (
        e_test_case_id
      ) REFERENCES test_cases.e_test_case (id)
      FOREIGN KEY (
        e_test_element_id
      ) REFERENCES use_case_slices.e_use_case_slice (id),
      FOREIGN KEY (
        d_test_element_result_id
      ) REFERENCES test_cases.d_test_element_result (id)
);
--============================================================================--
